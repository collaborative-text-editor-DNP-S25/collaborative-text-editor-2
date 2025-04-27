import {
  type DocumentContent,
  type DocumentId,
  type Document,
  type VersionEntry,
} from "$lib/common/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";

export default class UpdateDocumenUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}

  async invoke(docId: DocumentId, newContent: DocumentContent): Promise<void> {
    const document = await this.documentRepo.getDocument(docId);

    if (!document) {
      throw new Error(`Document with ID ${docId} not found`);
    }

    let updatedVersionHistory: VersionEntry[];
    if (document === undefined) {
      updatedVersionHistory = [];
    } else {
      updatedVersionHistory = document.versionHistory;
    }

    const updatedDocument: Document = {
      id: docId,
      content: newContent,
      timestamp: new Date(),
      versionHistory: updatedVersionHistory,
      currentVersionIndex: document.currentVersionIndex + 1,
    };

    await this.documentRepo.updateDocument(docId, updatedDocument);

    this.socketRepo.broadcast(docId, newContent);
  }
}
