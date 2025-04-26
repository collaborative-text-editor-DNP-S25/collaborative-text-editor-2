import { type DocumentId } from "$lib/common/entities/Document";
import { type SocketClient } from "$lib/common/entities/SocketClient";

export type Message = string;

export default interface SocketRepository {
  broadcast(docId: DocumentId, message: Message): void;
  registerClient(client: SocketClient, docId: DocumentId): Promise<void>;
  unregisterClient(client: SocketClient, docId: DocumentId): Promise<void>;
}
