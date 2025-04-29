import {
  type DocumentContent,
  type DocumentId,
  type DocumentEntity,
} from "$lib/server/domain/entities/DocumentEntity";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";

export default class UpdateDocumentUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}

  invoke(docId: DocumentId, newContent: DocumentContent): void {
    const document = this.documentRepo.getDocument(docId);

    if (document === undefined) {
      this.socketRepo.broadcast(docId, { ok: false });
      return;
    }

    const updatedVersionHistory = document.versionHistory;

    const updatedDocument: DocumentEntity = {
      id: docId,
      content: newContent,
      timestamp: new Date(),
      versionHistory: updatedVersionHistory,
      currentVersionIndex: document.currentVersionIndex + 1,
    };

    this.documentRepo.updateDocument(docId, updatedDocument);

    this.socketRepo.broadcast(docId, { ok: true, data: updatedDocument });
  }
}
