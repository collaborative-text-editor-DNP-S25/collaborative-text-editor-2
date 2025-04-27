import { type DocumentId } from "$lib/common/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";

export default class RedoDocumenUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}

  async invoke(docId: DocumentId): Promise<void> {
    const document = await this.documentRepo.redo(docId);
    if (document) {
      this.socketRepo.broadcast(docId, document.content);
    }
  }
}
