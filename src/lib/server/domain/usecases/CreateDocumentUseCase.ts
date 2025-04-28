import type { DocumentId } from "$lib/server/domain/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";

export default class CreateToDocumenUseCase {
  constructor(private documentRepo: DocumentRepository) {}
  async invoke(): Promise<DocumentId> {
    const id = await this.documentRepo.createDocument();
    return id;
  }
}
