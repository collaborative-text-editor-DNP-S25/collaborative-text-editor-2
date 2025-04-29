import type { DocumentId } from "$lib/server/domain/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";

export default class CreateToDocumentUseCase {
  constructor(private documentRepo: DocumentRepository) {}
  invoke(): DocumentId {
    const id = this.documentRepo.createDocument();
    return id;
  }
}
