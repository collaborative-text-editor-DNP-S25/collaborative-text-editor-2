import { type DocumentId } from "$lib/server/domain/entities/DocumentEntity";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";

export default class UndoDocumentUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}

  async invoke(docId: DocumentId): Promise<void> {
    try {
      const document = await this.documentRepo.undo(docId);

      if (document === undefined) {
        // Broadcast failure to all clients in the document's room
        this.socketRepo.broadcast(docId, { ok: false });
        return;
      }
      // Broadcast succesfull undo to all clients in the document's room
      this.socketRepo.broadcast(docId, { ok: true, data: document });
    } catch {
      // Silently ignore errors when undo operation is unavailable
    }
  }
}
