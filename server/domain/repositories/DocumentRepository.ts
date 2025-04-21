export interface DocumentRepository {
    createDocument(): Promise<string>;
    getDocument(docId: string): Promise<Document | null>;
    updateDocument(docId: string, document: Document): Promise<void>;
    // TODO: declare methods for version history and deletion
}