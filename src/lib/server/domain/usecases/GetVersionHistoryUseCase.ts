import type {
    DocumentId,
    VersionEntry,
 } from "$lib/server/domain/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import { type Document } from "$lib/server/domain/entities/Document";
import type SocketRepository from "../repositories/SocketRepository";
import type { SocketClient } from "../entities/SocketClient";

export default class GetDocumentUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}

  invoke(client: SocketClient, docId: DocumentId): VersionEntry[] | undefined {
    const doc = this.documentRepo.getDocument(docId);
    if (doc == null) {
      return;
    } else {
      this.socketRepo.sendVersionHistory(client, doc.versionHistory);
    }
  }
}
