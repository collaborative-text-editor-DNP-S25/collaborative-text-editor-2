import {
  type DocumentId,
  type DocumentEntity,
  type VersionEntry,
} from "$lib/server/domain/entities/DocumentEntity";

export default interface DocumentRepository {
  createDocument(): DocumentId;
  getDocument(docId: DocumentId): DocumentEntity | undefined;
  updateDocument(docId: DocumentId, document: DocumentEntity): void;
  deleteDocument(docId: DocumentId): DocumentId;
  undo(docId: DocumentId): DocumentEntity | undefined;
  redo(docId: DocumentId): DocumentEntity | undefined;
  getAllDocuments(): DocumentId[];
  getVersionHistory(docId: DocumentId): VersionEntry[];
  jump(docId: DocumentId, versionIndex: number): DocumentEntity | undefined;
}
