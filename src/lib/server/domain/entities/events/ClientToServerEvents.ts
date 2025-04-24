import {
  type DocumentContent,
  type DocumentId,
} from "$lib/server/domain/entities/Document";

export interface ClientToServerEvents {
  enterDocument: (docId: DocumentId) => void;
  exitDocument: (docId: DocumentId) => void;
  updateDocument: (docId: DocumentId, newContent: DocumentContent) => void;
}
