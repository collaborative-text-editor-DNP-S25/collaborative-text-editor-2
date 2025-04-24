import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";
import type {
  DocumentContent,
  DocumentId,
} from "$lib/server/domain/entities/Document";

export default class UpdateDocumenUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}

  invoke(docId: DocumentId, newContent: DocumentContent): void {
    // TODO: implement document data part of use case

    this.socketRepo.broadcast(docId, newContent);
  }
}
