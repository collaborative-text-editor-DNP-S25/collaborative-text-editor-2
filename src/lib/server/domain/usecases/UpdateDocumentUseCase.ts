import {
  type DocumentContent,
  type DocumentId,
  type Document,
} from "$lib/server/domain/entities/Document";
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
      throw new Error(`Document with id ${docId} not found`);
    }

    const updatedDocument: Document = {
      ...document,
      content: newContent,
      timestamp: new Date(),
    };

    await this.documentRepo.updateDocument(docId, updatedDocument);

    this.socketRepo.broadcast(docId, newContent);
  }
}
