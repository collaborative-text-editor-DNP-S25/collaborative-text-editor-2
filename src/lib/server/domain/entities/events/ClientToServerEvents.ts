import { type DocumentId } from "$lib/server/domain/entities/Document";

export interface ClientToServerEvents {
  register: (docId: DocumentId) => void;
  unregister: (docId: DocumentId) => void;
}
