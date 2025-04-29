import {
  type DocumentId,
  type VersionEntry,
 } from "$lib/server/domain/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type { Document } from "$lib/server/domain/entities/Document";

export default class DocumentRepositoryImpl implements DocumentRepository {
  private id = 0;
  // Map to store the documents
  private documents = new Map<string, Document>();
  private readonly ERROR_DOC_ID: DocumentId = { id: "doc-errorId" }; // Uniform type of non-existent document

  createDocument(): DocumentId {
    const docId: DocumentId = {
      id: `doc-${(this.id++).toString()}`,
    };
    const newDoc: Document = {
      id: docId,
      content: "",
      timestamp: new Date(),
      versionHistory: [],
      currentVersionIndex: -1,
    };
    this.documents.set(docId.id, newDoc);

    return docId;
  }

  getDocument(docId: DocumentId): Document | undefined {
    const document = this.documents.get(docId.id);
    if (document === undefined) {
      return undefined;
    }
    return {
      ...document,
      timestamp: new Date(document.timestamp),
    };
  }

  updateDocument(docId: DocumentId, document: Document): void {
    const existingDoc = this.documents.get(docId.id);
    if (!existingDoc) {
      throw new Error(`Document with id ${docId.id} not found`);
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

    this.documents.set(docId.id, {
      ...document,
      timestamp: new Date(),
      versionHistory: existingDoc.versionHistory,
    });
  }

  deleteDocument(docId: DocumentId): DocumentId {
    const exists = this.documents.delete(docId.id);
    return exists ? docId : this.ERROR_DOC_ID;
  }

  undo(docId: DocumentId): Document | undefined {
    const document = this.documents.get(docId.id);
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
    this.documents.set(docId.id, updatedDocument);
    return updatedDocument;
  }

  redo(docId: DocumentId): Document | undefined {
    const document = this.documents.get(docId.id);
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
    this.documents.set(docId.id, updatedDocument);
    return updatedDocument;
  }

  getAllDocuments(): DocumentId[] {
    const documentIds: DocumentId[] = [];
    this.documents.forEach((value: Document, key: string) => {
      documentIds.push({ id: key });
    });

    return documentIds;
  }

  jump(docId: DocumentId, versionIndex: number): Document | undefined {
    const document = this.documents.get(docId.id);
    if (!document || versionIndex < 0 || versionIndex >= document.versionHistory.length) {
      return undefined;
    }

    const newContent = document.versionHistory[versionIndex].content;
    const updatedDocument: Document = {
      ...document,
      content: newContent,
      timestamp: new Date(),
      versionHistory: document.versionHistory,
      currentVersionIndex: versionIndex,
    };
    this.documents.set(docId.id, updatedDocument);
    return updatedDocument;
  }

  getVersionHistory(docId: DocumentId): VersionEntry[] {
    const document = this.documents.get(docId.id);
    if (!document) {
      throw new Error(`Document with id ${docId} not found`);
    }
    return document.versionHistory;
  }
}