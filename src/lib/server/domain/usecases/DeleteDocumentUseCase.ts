import type { DocumentId } from "$lib/server/domain/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";

export default class DeleteDocumentUseCase {
  constructor(private documentRepo: DocumentRepository) {}
  invoke(docId: DocumentId): DocumentId {
    const id = this.documentRepo.deleteDocument(docId);
    return id;
  }
}
