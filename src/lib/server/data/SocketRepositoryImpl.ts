import { type Server } from "socket.io";

import { type DocumentId, type VersionEntry } from "$lib/server/domain/entities/Document";
import { type ClientToServerEvents } from "$lib/server/domain/entities/events/ClientToServerEvents";
import { type ServerToClientEvents } from "$lib/server/domain/entities/events/ServerToClientEvents";
import { type SocketClient } from "$lib/server/domain/entities/SocketClient";
import { type SubscriberData } from "$lib/server/domain/entities/SubscriberData";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";
import type { ResponseMessage } from "../domain/entities/ResponseMessage";

export default class SocketRepositoryImpl implements SocketRepository {
  constructor(
    private io: Server<
      ClientToServerEvents,
      ServerToClientEvents,
      never,
      SubscriberData
    >,
  ) {}

  broadcast(docId: DocumentId, message: ResponseMessage): void {
    this.io.to(docId.id).emit("sendMessage", message);
  }

  sendAllDocuments(client: SocketClient, documentIds: DocumentId[]): void {
    this.io.to(client.id).emit("sendDocumentIds", documentIds);
  }

  sendDocument(client: SocketClient, documentContent: ResponseMessage): void {
    this.io.to(client.id).emit("sendDocument", documentContent);
  }

  sendVersionHistory(client: SocketClient, versionHistory: VersionEntry[]): void {
    this.io.to(client.id).emit("sendVersionHistory", versionHistory);
  }

  async registerClient(client: SocketClient, docId: DocumentId): Promise<void> {
    await client.join(docId.id);
    client.data.docId = docId;
  }

  async unregisterClient(
    client: SocketClient,
    docId: DocumentId,
  ): Promise<void> {
    await client.leave(docId.id);
    client.data.docId = undefined;
  }
}
