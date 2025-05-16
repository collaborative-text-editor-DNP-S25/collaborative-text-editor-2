import {
  type DocumentId,
  type DocumentEntity,
  type VersionEntry,
} from "$lib/server/domain/entities/DocumentEntity";

// Interface defining operations for documents
export default interface DocumentRepository {
  // Core CRUD operations
  createDocument(): Promise<DocumentId>;
  updateDocument(docId: DocumentId, document: DocumentEntity): Promise<void>;
  deleteDocument(docId: DocumentId):  Promise<DocumentId>;
  undo(docId: DocumentId): Promise<DocumentEntity | undefined>;
  redo(docId: DocumentId): Promise<DocumentEntity | undefined>;

  getDocument(docId: DocumentId): Promise<DocumentEntity | undefined>;
  getAllDocuments():  Promise<DocumentId[]>;
  getVersionHistory(docId: DocumentId):  Promise<VersionEntry[]>;
  jump(docId: DocumentId, versionIndex: number):  Promise<DocumentEntity | undefined>;
}
