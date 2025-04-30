import { type DocumentId } from "$lib/server/domain/entities/DocumentEntity";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";

export default class RedoDocumentUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}

  invoke(docId: DocumentId): void {
    try {
      const document = this.documentRepo.redo(docId);

      if (document === undefined) {
        // Broadcast failure to all clients in the document's room
        this.socketRepo.broadcast(docId, { ok: false });
        return;
      }
      // Broadcast successful redo to all clients in the document's room
      this.socketRepo.broadcast(docId, { ok: true, data: document });
    } catch {
      // Silently ignore errors when redo operation is unavailable
    }
  }
}
