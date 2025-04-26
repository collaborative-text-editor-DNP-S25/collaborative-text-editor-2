import {
  type DocumentContent,
  type DocumentId,
} from "$lib/common/entities/Document";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";

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
