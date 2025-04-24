import { type DocumentId } from "$lib/server/domain/entities/Document";
import type { SocketClient } from "$lib/server/domain/entities/SocketClient";


export type Message = string;

export interface SocketRepository {
  broadcast(docContent: DocumentId, message: Message): void;
  registerClient(client: SocketClient, docId: DocumentId): Promise<void>;
  unregisterClient(client: SocketClient, docId: DocumentId): Promise<void>;
}
