import {
  type DocumentContent,
  type DocumentId,
} from "$lib/server/domain/entities/DocumentEntity";

export interface ClientToServerEvents {
  enterDocument: (docId: DocumentId) => void;
  exitDocument: (docId: DocumentId) => void;
  updateDocument: (docId: DocumentId, newContent: DocumentContent) => void;
  createDocument: () => void;
  deleteDocument: (docId: DocumentId) => void;
  undo: (docId: DocumentId) => void;
  redo: (docId: DocumentId) => void;
  getAllDocuments: () => void;
  getDocument: (docId: DocumentId) => void;
  jump: (docId: DocumentId, versionIndex: number) => void;
  getVersionHistory: (docId: DocumentId, versionIndex: number) => void;
}
