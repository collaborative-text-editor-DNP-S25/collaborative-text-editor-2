import { DocumentRepository } from "../domain/repositories/DocumentRepository";

export class DocumentRepositoryImpl implements DocumentRepository {
  async createDocument(): Promise<string> {
    // TODO: implement create doc functionality
    return new Promise((resolve, reject) => {
      const documentId = "1";
      resolve(documentId);
    });
  }

  async getDocument(docId: string): Promise<Document | null> {
    return new Promise((resolve, reject) => {
      // TODO: implement get doc functionality
      resolve(null);
    });
  }

  async updateDocument(docId: string, document: Document): Promise<void> {
    return new Promise((resolve, reject) => {
      // TODO: implement update doc functionality
      resolve();
    });
  }
  deleteDocument(docId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // TODO: implement delete doc functionality
    });
  }
}
