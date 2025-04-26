import { type Server } from "socket.io";

import { type DocumentId } from "$lib/common/entities/Document";
import { type ClientToServerEvents } from "$lib/common/entities/events/ClientToServerEvents";
import { type ServerToClientEvents } from "$lib/common/entities/events/ServerToClientEvents";
import { type SocketClient } from "$lib/common/entities/SocketClient";
import { type SubscriberData } from "$lib/common/entities/SubscriberData";
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
    this.io.to(docId).emit("sendMessage", message);
  }

  async registerClient(client: SocketClient, docId: DocumentId): Promise<void> {
    await client.join(docId);
    client.data.docId = docId;
  }

  async unregisterClient(
    client: SocketClient,
    docId: DocumentId,
  ): Promise<void> {
    await client.leave(docId);
    client.data.docId = "";
  }
}
