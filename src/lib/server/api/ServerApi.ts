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
import type { DocumentId } from "../domain/entities/Document";

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
      });

      socket.on("exitDocument", async (docId) => {
        await this.useCaseContainer.exitDocument.invoke(socket, docId);
      });

      socket.on("disconnect", async () => {
        if (socket.data.docId) {
          await this.useCaseContainer.exitDocument.invoke(
            socket,
            socket.data.docId,
          );
        }
      });

      socket.on("updateDocument", (docId, newContent) => {
        this.useCaseContainer.updateDocument.invoke(docId, newContent);
      });
    });
  }

  start(port: number): void {
    this.server.listen(port, () => {
      console.log(`Server started on port: ${port.toString()}`);
    });
  }
  // Inner class to manage Document
  // Passing useCaseContainer here ensures that we use the same class of type DocumentRepositoryImpl
  public DocumentManagement = class {
    constructor(private parent: MainApi) {}

    public createDoc(): Promise<DocumentId> {
      const id = this.parent.useCaseContainer.createDocument.invoke();
      return id;
    }

    public deleteDoc(docId: DocumentId): Promise<DocumentId> {
      const id = this.parent.useCaseContainer.deleteDocument.invoke(docId);
      return id;
    }
  }
}


