import {
  type DocumentContent,
  type DocumentId,
  type Document,
} from "$lib/server/domain/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";

export default class UpdateDocumenUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}

  invoke(docId: DocumentId, newContent: DocumentContent): void {
    const document = this.documentRepo.getDocument(docId);

    if (document === undefined) {
      throw new Error(`Document with ID ${docId.id} not found`);
    }

    const updatedVersionHistory = document.versionHistory;

    const updatedDocument: Document = {
      id: docId,
      content: newContent,
      timestamp: new Date(),
      versionHistory: updatedVersionHistory,
      currentVersionIndex: document.currentVersionIndex + 1,
    };

    this.documentRepo.updateDocument(docId, updatedDocument);

    this.socketRepo.broadcast(docId, newContent);
  }
}
