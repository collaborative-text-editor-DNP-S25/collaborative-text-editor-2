import { type DocumentId } from "$lib/common/entities/Document";

export default interface DocumentRepository {
  createDocument(): Promise<DocumentId>;
  getDocument(docId: DocumentId): Promise<Document | undefined>;
  updateDocument(docId: DocumentId, document: Document): Promise<void>;
  deleteDocument(docId: DocumentId): Promise<DocumentId>;

  // TODO: declare methods for version history
}
