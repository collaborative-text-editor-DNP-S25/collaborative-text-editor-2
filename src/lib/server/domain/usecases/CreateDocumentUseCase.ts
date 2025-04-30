import type { DocumentId } from "$lib/server/domain/entities/DocumentEntity";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";

export default class CreateDocumentUseCase {
  constructor(private documentRepo: DocumentRepository) {}

  invoke(): DocumentId {
    const id = this.documentRepo.createDocument();
    return id;
  }
}
