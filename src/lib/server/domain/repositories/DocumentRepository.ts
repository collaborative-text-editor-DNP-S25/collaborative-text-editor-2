import { type DocumentId, type Document } from "$lib/common/entities/Document";

export default interface DocumentRepository {
  createDocument(): Promise<DocumentId>;
  getDocument(docId: DocumentId): Promise<Document | undefined>;
  updateDocument(docId: DocumentId, document: Document): Promise<void>;
  deleteDocument(docId: DocumentId): Promise<DocumentId>;
  undo(docId: DocumentId): Promise<Document | undefined>;
  redo(docId: DocumentId): Promise<Document | undefined>;
  getAllDocuments(): Promise<DocumentId[]>;
}
