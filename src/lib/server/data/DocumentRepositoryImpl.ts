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
      versionHistory: [],
    };
    DocumentRepositoryImpl.documents.set(docId, newDoc);
    return docId;
  }

  async getDocument(docId: DocumentId): Promise<Document | undefined> {
    const document = DocumentRepositoryImpl.documents.get(docId);
    if (!document) {
      return undefined;
    }
    return {
      ...document,
      timestamp: new Date(document.timestamp),
    };
  }

  async updateDocument(docId: DocumentId, document: Document): Promise<void> {
    const existingDoc = DocumentRepositoryImpl.documents.get(docId);
    if (!existingDoc) {
      throw new Error(`Document with id ${docId} not found`);
    }

    const versionHistory = existingDoc.versionHistory;
    versionHistory.push({
      content: existingDoc.content,
      timestamp: existingDoc.timestamp,
    });

    DocumentRepositoryImpl.documents.set(docId, {
      ...document,
      timestamp: new Date(),
      versionHistory,
    });
  }

  async deleteDocument(docId: DocumentId): Promise<DocumentId> {
    const exists = DocumentRepositoryImpl.documents.delete(docId);
    return exists ? docId : DocumentRepositoryImpl.ERROR_DOC_ID;
  }
}
