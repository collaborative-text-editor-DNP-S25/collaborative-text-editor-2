import express, { type Express } from "express";
import { createServer, type Server as HttpServer } from "http";
import { Server as IoServer } from "socket.io";

import DocumentRepositoryImpl from "$lib/server/data/DocumentRepositoryImpl";
import SocketRepositoryImpl from "$lib/server/data/SocketRepositoryImpl";
import { type ClientToServerEvents } from "$lib/common/entities/events/ClientToServerEvents";
import { type ServerToClientEvents } from "$lib/common/entities/events/ServerToClientEvents";
import { type SocketClient } from "$lib/common/entities/SocketClient";
import { type SubscriberData } from "$lib/common/entities/SubscriberData";
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

  private setupSocketHandlers(): void {
    this.io.on("connection", (socket: SocketClient) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on("enterDocument", async (docId) => {
        await this.useCaseContainer.enterDocument.invoke(socket, docId);
        console.log(`Client [${socket.id}] entered document: ${docId}`);
      });

      socket.on("exitDocument", async (docId) => {
        await this.useCaseContainer.exitDocument.invoke(socket, docId);
        console.log(`Client [${socket.id}] exited document: ${docId}`);
      });

      socket.on("disconnect", async () => {
        if (socket.data.docId) {
          await this.useCaseContainer.exitDocument.invoke(
            socket,
            socket.data.docId,
          );
        }
      });

      socket.on("updateDocument", async (docId, newContent) => {
        await this.useCaseContainer.updateDocument.invoke(docId, newContent);
        console.log(
          `Client [${socket.id}] updated document: ${docId} with new content: ${newContent}`,
        );
      });

      socket.on("createDocument", async () => {
        await this.useCaseContainer.createDocument.invoke();
      });

      socket.on("deleteDocument", async (docId) => {
        await this.useCaseContainer.deleteDocument.invoke(docId);
      });

      socket.on("undo", async (docId) => {
        await this.useCaseContainer.redoDocument.invoke(docId);
        console.log(
          `Client [${socket.id}] performed undo on document: ${docId}`,
        );
      });

      socket.on("redo", async (docId) => {
        await this.useCaseContainer.redoDocument.invoke(docId);
        console.log(
          `Client [${socket.id}] performed redo on document: ${docId}`,
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
