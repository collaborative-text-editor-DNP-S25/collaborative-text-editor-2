import {
  type DocumentId,
  type DocumentContent,
} from "$lib/server/domain/entities/Document";

export type Message = string;
export type Client = WebSocket;

export interface SocketRepository {
  broadcast(docContent: DocumentContent, message: Message): Promise<void>;
  registerClient(client: Client, docId: DocumentId): Promise<void>;
  unregisterClient(client: Client, docId: DocumentId): Promise<void>;
}
