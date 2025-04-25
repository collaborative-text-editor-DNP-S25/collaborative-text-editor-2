import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import { type DocumentId } from "$lib/server/domain/entities/Document";

export default class CreateToDocumenUseCase {
  constructor(private documentRepo: DocumentRepository) {}
  // TODO: implement use case
  async invoke(): Promise<DocumentId> {
    const id = await this.documentRepo.createDocument();
    return id;
  }
}
