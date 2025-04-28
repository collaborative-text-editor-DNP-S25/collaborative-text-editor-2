import { type DocumentId } from "$lib/server/domain/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";

export default class RedoDocumenUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) { }

  invoke(docId: DocumentId): void {
    const document = this.documentRepo.redo(docId);
    if (document) {
      this.socketRepo.broadcast(docId, document.content);
    }
  }
}
