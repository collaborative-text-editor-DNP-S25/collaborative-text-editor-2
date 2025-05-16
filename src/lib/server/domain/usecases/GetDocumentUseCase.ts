import type { DocumentId } from "$lib/server/domain/entities/DocumentEntity";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import { type DocumentEntity } from "$lib/server/domain/entities/DocumentEntity";
import type SocketRepository from "../repositories/SocketRepository";
import type { SocketClient } from "../entities/SocketClient";

export default class GetDocumentUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}

  async invoke(client: SocketClient, docId: DocumentId): Promise<DocumentEntity | undefined> {
    const doc = await this.documentRepo.getDocument(docId);
    if (doc == null) {
      return;
    } else {
      this.socketRepo.sendDocument(client, { ok: true, data: doc });
    }
  }
}
