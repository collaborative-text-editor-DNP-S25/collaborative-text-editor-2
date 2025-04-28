import {
  type DocumentId,
  type Document,
} from "$lib/server/domain/entities/Document";

export default interface DocumentRepository {
  createDocument(): DocumentId;
  getDocument(docId: DocumentId): Document | undefined;
  updateDocument(docId: DocumentId, document: Document): void;
  deleteDocument(docId: DocumentId): DocumentId;
  undo(docId: DocumentId): Document | undefined;
  redo(docId: DocumentId): Document | undefined;
  getAllDocuments(): DocumentId[];
}
