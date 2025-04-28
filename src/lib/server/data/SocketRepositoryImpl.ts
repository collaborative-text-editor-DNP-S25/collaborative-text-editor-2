import { type Server } from "socket.io";

import { type DocumentId } from "$lib/server/domain/entities/Document";
import { type ClientToServerEvents } from "$lib/server/domain/entities/events/ClientToServerEvents";
import { type ServerToClientEvents } from "$lib/server/domain/entities/events/ServerToClientEvents";
import { type SocketClient } from "$lib/server/domain/entities/SocketClient";
import { type SubscriberData } from "$lib/server/domain/entities/SubscriberData";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";
import { type Message } from "$lib/server/domain/repositories/SocketRepository";

export default class SocketRepositoryImpl implements SocketRepository {
  constructor(
    private io: Server<
      ClientToServerEvents,
      ServerToClientEvents,
      never,
      SubscriberData
    >,
  ) {}

  broadcast(docId: DocumentId, message: Message): void {
    this.io.to(docId.id).emit("sendMessage", message);
  }

  sendAllDocuments(client: SocketClient, documentIds: DocumentId[]): void {
    this.io.to(client.id).emit("sendDocumentIds", documentIds);
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
