export interface DocumentRepository {
  createDocument(): Promise<string>;
  getDocument(docId: string): Promise<Document | null>;
  updateDocument(docId: string, document: Document): Promise<void>;
  deleteDocument(docId: string): Promise<string>;
  // TODO: declare methods for version history and deletion
}
