import { type DocumentId } from "$lib/server/domain/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";

export default class JumpDocumentUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) { }

  invoke(docId: DocumentId, versionIndex: number): void {
    const document = this.documentRepo.redo(docId);
    
    if (document === undefined) {
      this.socketRepo.broadcast(docId, { ok: false });
      return;
    }
    this.socketRepo.broadcast(docId, { ok: true, data: document.content });
  }
}
