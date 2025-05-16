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

  async invoke(docId: DocumentId, newContent: DocumentContent): Promise<void> {
    const document = await this.documentRepo.getDocument(docId);

    if (document === undefined) {
      // Broadcast failure to all clients in the document's room
      this.socketRepo.broadcast(docId, { ok: false });
      return;
    }

    // Prevent unnecessary updates and version history bloat
    if (document.content === newContent) {
      return;
    }

    // Create new document version entry while preserving history
    const updatedDocument: DocumentEntity = {
      id: docId,
      content: newContent,
      timestamp: new Date(),
      versionHistory: document.versionHistory,
      currentVersionIndex: document.currentVersionIndex + 1, // Increment version pointer
    };

    this.documentRepo.updateDocument(docId, updatedDocument);

    // Broadcast successful update to all clients in the document's room
    this.socketRepo.broadcast(docId, { ok: true, data: updatedDocument });
  }
}
