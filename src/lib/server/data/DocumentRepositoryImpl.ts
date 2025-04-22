import { type DocumentId } from "$lib/server/domain/Document";
import { type DocumentRepository } from "$lib/server/domain/repositories/DocumentRepository";

export default class DocumentRepositoryImpl implements DocumentRepository {
  async createDocument(): Promise<DocumentId> {
    // TODO: implement create doc functionality
    throw undefined;
  }

  async getDocument(docId: DocumentId): Promise<Document | undefined> {
    // TODO: implement get doc functionality
    throw undefined;
  }

  async updateDocument(docId: DocumentId, document: Document): Promise<void> {
    // TODO: implement update doc functionality
    throw undefined;
  }

  deleteDocument(docId: DocumentId): Promise<DocumentId> {
    // TODO: implement delete doc functionality
    throw undefined;
  }
}
