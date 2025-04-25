import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import { type DocumentId } from "$lib/server/domain/entities/Document";

export default class DeleteDocumenUseCase {
  constructor(private documentRepo: DocumentRepository) {}
  async invoke(docId: DocumentId): Promise<DocumentId> {
    const id = await this.documentRepo.deleteDocument(docId);
    return id;
  }
}
