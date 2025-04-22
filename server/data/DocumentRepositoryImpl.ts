import { DocumentId } from "../domain/Document";
import { DocumentRepository } from "../domain/repositories/DocumentRepository";

export class DocumentRepositoryImpl implements DocumentRepository {
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
