import type { DocumentId } from "$lib/server/domain/entities/DocumentEntity";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";

export default class CreateDocumentUseCase {
  constructor(private documentRepo: DocumentRepository) {}

  async invoke(): Promise<DocumentId> {
    const id = await this.documentRepo.createDocument();
    return id;
  }
}
