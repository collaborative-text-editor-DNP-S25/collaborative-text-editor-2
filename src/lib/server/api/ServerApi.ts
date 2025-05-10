import express, { type Express } from "express";
import { createServer, type Server as HttpServer } from "http";
import { Server as IoServer } from "socket.io";

import DocumentRepositoryImpl from "$lib/server/data/DocumentRepositoryImpl";
import SocketRepositoryImpl from "$lib/server/data/SocketRepositoryImpl";
import { type ClientToServerEvents } from "$lib/server/domain/entities/events/ClientToServerEvents";
import { type ServerToClientEvents } from "$lib/server/domain/entities/events/ServerToClientEvents";
import { type SocketClient } from "$lib/server/domain/entities/SocketClient";
import { type SubscriberData } from "$lib/server/domain/entities/SubscriberData";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";
import UseCaseContainer from "$lib/server/domain/UseCaseContainer";

export default class ServerApi {
  app: Express;
  server: HttpServer;
  io: IoServer<
    ClientToServerEvents,
    ServerToClientEvents,
    never,
    SubscriberData
  >;

  // Api collects all data from domain and data layers
  documentRepo: DocumentRepository;
  socketRepo: SocketRepository;
  useCaseContainer: UseCaseContainer;

  constructor() {
    this.app = express();
    this.server = createServer();
    this.io = new IoServer<
      ClientToServerEvents,
      ServerToClientEvents,
      never,
      SubscriberData
    >(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.documentRepo = new DocumentRepositoryImpl();
    this.socketRepo = new SocketRepositoryImpl(this.io);
    this.useCaseContainer = new UseCaseContainer(
      this.documentRepo,
      this.socketRepo,
    );
    this.setupSocketHandlers();
  }

  // Usage of the operations on socket
  private setupSocketHandlers(): void {
    this.io.on("connection", (socket: SocketClient) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on("enterDocument", async (docId) => {
        await this.useCaseContainer.enterDocument.invoke(socket, docId);
        console.log(`Client [${socket.id}] enters room ${docId.id}`);
      });

      socket.on("exitDocument", async (docId) => {
        await this.useCaseContainer.exitDocument.invoke(socket, docId);
        console.log(`Client [${socket.id}] exits room ${docId.id}`);
      });

      socket.on("disconnect", async () => {
        if (socket.data.docId !== undefined) {
          await this.useCaseContainer.exitDocument.invoke(
            socket,
            socket.data.docId,
          );
        }
      });

      socket.on("updateDocument", (docId, newContent) => {
        this.useCaseContainer.updateDocument.invoke(docId, newContent);
        console.log(
          `Client [${socket.id}] updated document: ${docId.id} with new content: ${newContent}`,
        );
      });

      socket.on("createDocument", () => {
        this.useCaseContainer.createDocument.invoke();
      });

      socket.on("deleteDocument", (docId) => {
        this.useCaseContainer.deleteDocument.invoke(docId);
      });

      socket.on("undo", (docId) => {
        this.useCaseContainer.undoDocument.invoke(docId);
        console.log(
          `Client [${socket.id}] performed undo on document: ${docId.id}`,
        );
      });

      socket.on("redo", (docId) => {
        this.useCaseContainer.redoDocument.invoke(docId);
        console.log(
          `Client [${socket.id}] performed redo on document: ${docId.id}`,
        );
      });

      socket.on("getAllDocuments", () => {
        this.useCaseContainer.getAllDocuments.invoke(socket);
        console.log(`Client [${socket.id}] gets all documents`);
      });

      socket.on("getDocument", (docId) => {
        this.useCaseContainer.getDocument.invoke(socket, docId);
        console.log(`Client [${socket.id}] gets document: ${docId.id}`);
      });

      socket.on("jump", (docId, versionIndex) => {
        this.useCaseContainer.jumpDocument.invoke(docId, versionIndex);
        console.log(
          `Client [${socket.id}] jumps to version ${versionIndex.toString()}: ${docId.id}`,
        );
      });
    });
  }

  start(port: number): void {
    this.server.listen(port, () => {
      console.log(`Server started on port: ${port.toString()}`);
    });
  }
}
