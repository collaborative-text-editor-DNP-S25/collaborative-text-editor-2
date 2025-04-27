import type { DocumentId } from "$lib/common/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";

export default class DeleteDocumenUseCase {
  constructor(private documentRepo: DocumentRepository) {}
  async invoke(docId: DocumentId): Promise<DocumentId> {
    const id = await this.documentRepo.deleteDocument(docId);
    return id;
  }
}
