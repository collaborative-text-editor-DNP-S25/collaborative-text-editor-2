import { DocumentId } from "../Document";

export type Message = string;
export type Client = WebSocket;

export interface SocketRepository {
  broadcast(docId: DocumentId, message: Message): Promise<void>;
  registerClient(client: Client, docId: DocumentId): Promise<void>;
  unregisterClient(client: Client): Promise<void>;
}
