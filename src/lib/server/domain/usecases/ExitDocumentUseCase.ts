import type { DocumentId } from "$lib/server/domain/entities/Document";
import type { SocketClient } from "$lib/server/domain/entities/SocketClient";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";

export default class ExitDocumentUseCase {
  constructor(private socketRepo: SocketRepository) {}

  async invoke(client: SocketClient, docId: DocumentId): Promise<void> {
    await this.socketRepo.unregisterClient(client, docId);
  }
}
