import {
  type DocumentContent,
  type DocumentId,
} from "$lib/common/entities/Document";

export interface ClientToServerEvents {
  enterDocument: (docId: DocumentId) => void;
  exitDocument: (docId: DocumentId) => void;
  updateDocument: (docId: DocumentId, newContent: DocumentContent) => void;
  createDocument: () => void;
  deleteDocument: (docId: DocumentId) => void;
  undo: (docId: DocumentId) => void;
  redo: (docId: DocumentId) => void;
}
