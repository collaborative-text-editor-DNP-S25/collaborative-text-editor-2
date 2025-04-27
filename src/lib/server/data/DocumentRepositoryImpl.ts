import { type DocumentId } from "$lib/common/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type { Document } from "$lib/common/entities/Document";

export default class DocumentRepositoryImpl implements DocumentRepository {
  private static id = 0;
  // Map to store the documents
  private static documents = new Map<DocumentId, Document>();
  private static readonly ERROR_DOC_ID: DocumentId = { id: "doc-errorId" }; // Uniform type of non-existent document

  async createDocument(): Promise<DocumentId> {
    const docId: DocumentId = { id: `doc-${DocumentRepositoryImpl.id++}` };
    const newDoc: Document = {
      id: docId,
      content: "",
      timestamp: new Date(),
      versionHistory: [],
      currentVersionIndex: -1,
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

    // const versionHistory = existingDoc.versionHistory;
    // versionHistory.push({
    //   content: existingDoc.content,
    //   timestamp: existingDoc.timestamp,
    // });

    if (document.content !== existingDoc.content) {
      existingDoc.versionHistory = existingDoc.versionHistory.slice(
        0,
        existingDoc.currentVersionIndex + 1,
      );
      existingDoc.versionHistory.push({
        content: existingDoc.content,
        timestamp: existingDoc.timestamp,
      });
      document.currentVersionIndex = existingDoc.versionHistory.length - 1;
    }

    DocumentRepositoryImpl.documents.set(docId, {
      ...document,
      timestamp: new Date(),
      versionHistory: existingDoc.versionHistory,
    });
  }

  async deleteDocument(docId: DocumentId): Promise<DocumentId> {
    const exists = DocumentRepositoryImpl.documents.delete(docId);
    return exists ? docId : DocumentRepositoryImpl.ERROR_DOC_ID;
  }

  async undo(docId: DocumentId): Promise<Document | undefined> {
    const document = DocumentRepositoryImpl.documents.get(docId);
    if (!document || document.currentVersionIndex <= -1) {
      return undefined;
    }

    const newIndex = document.currentVersionIndex - 1;
    const newContent =
      newIndex >= 0 ? document.versionHistory[newIndex].content : "";
    const updatedDocument: Document = {
      ...document,
      content: newContent,
      timestamp: new Date(),
      versionHistory: document.versionHistory,
      currentVersionIndex: newIndex,
    };
    DocumentRepositoryImpl.documents.set(docId, updatedDocument);
    return updatedDocument;
  }

  async redo(docId: DocumentId): Promise<Document | undefined> {
    const document = DocumentRepositoryImpl.documents.get(docId);
    if (
      !document ||
      document.currentVersionIndex >= document.versionHistory.length - 1
    ) {
      return undefined;
    }

    const newIndex = document.currentVersionIndex + 1;
    const newContent = document.versionHistory[newIndex].content;
    const updatedDocument: Document = {
      ...document,
      content: newContent,
      timestamp: new Date(),
      versionHistory: document.versionHistory,
      currentVersionIndex: newIndex,
    };
    DocumentRepositoryImpl.documents.set(docId, updatedDocument);
    return updatedDocument;
  }

  async getAllDocuments(): Promise<DocumentId[]> {
    var documentIds: DocumentId[] = [];
    DocumentRepositoryImpl.documents.forEach(
      (value: Document, key: DocumentId) => {
        documentIds.push(key);
      },
    );

    return documentIds;
  }
}
