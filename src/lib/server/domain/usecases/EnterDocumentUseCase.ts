import { type DocumentId } from "$lib/server/domain/entities/DocumentEntity";
import type { SocketClient } from "$lib/server/domain/entities/SocketClient";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";

export default class EnterDocumentUseCase {
  constructor(private socketRepo: SocketRepository) {}

  async invoke(client: SocketClient, docId: DocumentId): Promise<void> {
    await this.socketRepo.registerClient(client, docId);
  }
}
