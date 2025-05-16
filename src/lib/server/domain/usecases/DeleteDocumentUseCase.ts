import type { DocumentId } from "$lib/server/domain/entities/DocumentEntity";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";

export default class DeleteDocumentUseCase {
  constructor(private documentRepo: DocumentRepository) {}

  async invoke(docId: DocumentId): Promise<DocumentId> {
    const id = await this.documentRepo.deleteDocument(docId);
    return id;
  }
}
