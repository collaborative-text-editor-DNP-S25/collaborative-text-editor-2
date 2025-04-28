import { type Message } from "$lib/server/domain/repositories/SocketRepository";
import type { DocumentId } from "../Document";

export interface ServerToClientEvents {
  sendMessage: (message: Message) => void;
  sendDocumentIds: (documentIds: DocumentId[]) => void;
}
