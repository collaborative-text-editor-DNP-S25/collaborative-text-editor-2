import { type DocumentId } from "$lib/server/domain/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";

export default class DocumentRepositoryImpl implements DocumentRepository {
  async createDocument(): Promise<DocumentId> {
    // TODO: implement create doc functionality
    throw new Error();
  }

  async getDocument(docId: DocumentId): Promise<Document | undefined> {
    // TODO: implement get doc functionality
    throw new Error();
  }

  async updateDocument(docId: DocumentId, document: Document): Promise<void> {
    // TODO: implement update doc functionality
    throw new Error();
  }

  async deleteDocument(docId: DocumentId): Promise<DocumentId> {
    // TODO: implement delete doc functionality
    throw new Error();
  }
}
