import type { DocumentId } from "$lib/common/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";

export default class GetAllDocumentsUseCase {
  constructor(private documentRepo: DocumentRepository) {}
  async invoke(): Promise<DocumentId[]> {
    const ids = await this.documentRepo.getAllDocuments();
    return ids;
  }
}
