import {
  type DocumentId,
  type VersionEntry,
} from "$lib/server/domain/entities/DocumentEntity";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type { DocumentEntity } from "$lib/server/domain/entities/DocumentEntity";
import type { versionIndex } from "$lib/server/domain/entities/DocumentEntity";
export default class DocumentRepositoryImpl implements DocumentRepository {
  private id = 0;
  // Map to store the documents
  private documents = new Map<string, DocumentEntity>();
  private readonly ERROR_DOC_ID: DocumentId = { id: "doc-errorId" }; // Uniform type of non-existent document

  createDocument(): DocumentId {
    const docId: DocumentId = {
      id: `doc-${(this.id++).toString()}`,
    };
    const newDoc: DocumentEntity = {
      id: docId,
      content: "",
      timestamp: new Date(),
      versionHistory: [],
      currentVersionIndex: 0,
    };
    const versionEntryNew: VersionEntry = {
      content: "",
      timestamp: new Date(),
      versionIndex: 0,
    };
    // newDoc.versionHistory.push(versionEntryNew);
    this.documents.set(docId.id, newDoc);
    // console.log(`content: ${newDoc.content}, index: ${newDoc.currentVersionIndex}, length: ${newDoc.versionHistory.length}, create`);
    return docId;
  }

  getDocument(docId: DocumentId): DocumentEntity | undefined {
    const document = this.documents.get(docId.id);
    if (document === undefined) {
      return undefined;
    }
    return {
      ...document,
      timestamp: new Date(document.timestamp),
    };
  }

  updateDocument(docId: DocumentId, document: DocumentEntity): void {
    const existingDoc = this.documents.get(docId.id);
    if (!existingDoc) {
      throw new Error(`Document with id ${docId.id} not found`);
    }

    if (document.content !== existingDoc.content) {
      existingDoc.versionHistory = existingDoc.versionHistory.slice(
        0,
        existingDoc.currentVersionIndex + 1,
      );
      existingDoc.versionHistory.push({
        content: document.content,
        timestamp: document.timestamp,
        versionIndex: existingDoc.versionHistory.length - 1,
      });
      document.currentVersionIndex = existingDoc.versionHistory.length - 1;
    }

    this.documents.set(docId.id, {
      ...document,
      timestamp: new Date(),
      versionHistory: existingDoc.versionHistory,
    });
    // console.log(`content: ${existingDoc.content}, index: ${existingDoc.currentVersionIndex}, length: ${existingDoc.versionHistory.length}, update`);
  }

  deleteDocument(docId: DocumentId): DocumentId {
    const exists = this.documents.delete(docId.id);
    return exists ? docId : this.ERROR_DOC_ID;
  }

  undo(docId: DocumentId): DocumentEntity | undefined {
    const document = this.documents.get(docId.id);
    if (!document) {
      return undefined;
    }

    if (document.currentVersionIndex <= -1) {
      throw new Error(
        `Current version, ${document.currentVersionIndex.toString()} index is wrong`,
      );
    }

    const newIndex = document.currentVersionIndex - 1;
    const newContent =
      newIndex >= 0 ? document.versionHistory[newIndex].content : "";
    const updatedDocument: DocumentEntity = {
      ...document,
      content: newContent,
      timestamp: new Date(),
      versionHistory: document.versionHistory,
      currentVersionIndex: newIndex,
    };
    this.documents.set(docId.id, updatedDocument);
    // console.log(`content: ${updatedDocument.content}, index: ${updatedDocument.currentVersionIndex}, length: ${updatedDocument.versionHistory.length}, undo`);
    return updatedDocument;
  }

  redo(docId: DocumentId): DocumentEntity | undefined {
    const document = this.documents.get(docId.id);
    if (!document) {
      return undefined;
    }

    if (document.currentVersionIndex >= document.versionHistory.length - 1) {
      throw new Error(
        `Current version, ${document.currentVersionIndex.toString()} index is wrong`,
      );
    }

    const newIndex = document.currentVersionIndex + 1;
    const newContent = document.versionHistory[newIndex].content;
    const updatedDocument: DocumentEntity = {
      ...document,
      content: newContent,
      timestamp: new Date(),
      versionHistory: document.versionHistory,
      currentVersionIndex: newIndex,
    };
    this.documents.set(docId.id, updatedDocument);
    // console.log(`content: ${updatedDocument.content}, index: ${updatedDocument.currentVersionIndex}, length: ${updatedDocument.versionHistory.length}, redo`);
    return updatedDocument;
  }

  getAllDocuments(): DocumentId[] {
    const documentIds: DocumentId[] = [];
    this.documents.forEach((value: DocumentEntity, key: string) => {
      documentIds.push({ id: key });
    });

    return documentIds;
  }

  jump(docId: DocumentId, verIndex: versionIndex): DocumentEntity | undefined {
    const document = this.documents.get(docId.id);
    verIndex += 1; // constant +1 to handle scewing 0-indexing to 1-indexing
    if (
      !document ||
      verIndex < 0 ||
      verIndex >= document.versionHistory.length
    ) {
      return undefined;
    }

    const newContent = document.versionHistory[verIndex].content;
    const updatedDocument: DocumentEntity = {
      ...document,
      content: newContent,
      timestamp: new Date(),
      versionHistory: document.versionHistory,
      currentVersionIndex: verIndex,
    };
    this.documents.set(docId.id, updatedDocument);
    return updatedDocument;
  }

  getVersionHistory(docId: DocumentId): VersionEntry[] {
    const document = this.documents.get(docId.id);
    if (!document) {
      throw new Error(`Document with id ${docId.id.toString()} not found`);
    }
    return document.versionHistory;
  }
}
