import { type DocumentId } from "$lib/server/domain/entities/DocumentEntity";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";

export default class UndoDocumentUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}

  invoke(docId: DocumentId): void {
    const document = this.documentRepo.undo(docId);

    if (document === undefined) {
      this.socketRepo.broadcast(docId, { ok: false });
      return;
    }
    this.socketRepo.broadcast(docId, { ok: true, data: document.content });
  }
}
