import { type DocumentId } from "$lib/server/domain/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type Document from "$lib/server/domain/entities/Document";

export default class DocumentRepositoryImpl implements DocumentRepository {
  private static id = 0;
  // Map to store the documents
  private static documents = new Map<DocumentId, Document>();
  private static readonly ERROR_DOC_ID: DocumentId = "doc-errorId"; // Uniform type of non-existent document

  async createDocument(): Promise<DocumentId> {
    const docId: DocumentId = `doc-${DocumentRepositoryImpl.id++}`;
    const newDoc: Document = {
      id: docId,
      content: "",
      timestamp: new Date(),
    };
    DocumentRepositoryImpl.documents.set(docId, newDoc);
    return docId;
  }

  async getDocument(docId: DocumentId): Promise<Document | undefined> {
    // TODO: implement get doc functionality
    throw new Error();
  }

  async updateDocument(docId: DocumentId, document: Document): Promise<void> {
    // TODO: implement update doc functionality
  }

  async deleteDocument(docId: DocumentId): Promise<DocumentId> {
    const exists = DocumentRepositoryImpl.documents.delete(docId);
    return exists ? docId : DocumentRepositoryImpl.ERROR_DOC_ID;
  }
}
