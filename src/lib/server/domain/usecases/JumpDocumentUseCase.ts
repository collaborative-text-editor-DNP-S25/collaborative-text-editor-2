import { type DocumentId } from "$lib/server/domain/entities/DocumentEntity";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";
import { type versionIndex } from "$lib/server/domain/entities/DocumentEntity";

export default class JumpDocumentUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}

  async invoke(docId: DocumentId, verIndex: versionIndex): Promise<void> {
    const document = await this.documentRepo.jump(docId, verIndex);

    if (document === undefined) {
      // Broadcast failure to all clients in the document's room
      this.socketRepo.broadcast(docId, { ok: false });
      return;
    }
    // Broadcast success to all clients in the document's room
    this.socketRepo.broadcast(docId, { ok: true, data: document });
  }
}
