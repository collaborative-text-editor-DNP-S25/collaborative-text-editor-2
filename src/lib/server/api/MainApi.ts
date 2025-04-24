import DocumentRepositoryImpl from "$lib/server/data/DocumentRepositoryImpl";
import SocketRepositoryImpl from "$lib/server/data/SocketRepositoryImpl";
import { type ClientToServerEvents } from "$lib/server/domain/entities/events/ClientToServerEvents";
import { type ServerToClientEvents } from "$lib/server/domain/entities/events/ServerToClientEvents";
import { type SubscriberData } from "$lib/server/domain/entities/SubscriberData";
import { type DocumentRepository } from "$lib/server/domain/repositories/DocumentRepository";
import { type SocketRepository } from "$lib/server/domain/repositories/SocketRepository";
import express, { type Express } from "express";
import { createServer, type Server as HttpServer } from "http";
import { Server } from "socket.io";

export default class MainApi {
  app: Express;
  server: HttpServer;
  io: Server<ClientToServerEvents, ServerToClientEvents, never, SubscriberData>;

  documentRepo: DocumentRepository;
  socketRepo: SocketRepository;

  constructor() {
    this.app = express();
    this.server = createServer();
    this.io = new Server<
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
  }

  start(port: number) {
    this.server.listen(port, () => {
      console.log(`Server started on port: ${port.toString()}`);
    });
  }
}