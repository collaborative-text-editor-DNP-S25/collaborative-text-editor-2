import { type DocumentId } from "$lib/server/domain/entities/DocumentEntity";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";
import { type versionIndex } from "$lib/server/domain/entities/DocumentEntity";
export default class JumpDocumentUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}

  invoke(docId: DocumentId, verIndex: versionIndex): void {
    const document = this.documentRepo.jump(docId, verIndex);

    if (document === undefined) {
      this.socketRepo.broadcast(docId, { ok: false });
      return;
    }
    this.socketRepo.broadcast(docId, { ok: true, data: document });
  }
}
