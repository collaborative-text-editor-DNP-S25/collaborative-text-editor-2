import type { DocumentId } from "$lib/common/entities/Document";
import type { SocketClient } from "$lib/common/entities/SocketClient";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";

export default class ExitDocumenUseCase {
  constructor(private socketRepo: SocketRepository) {}

  async invoke(client: SocketClient, docId: DocumentId): Promise<void> {
    await this.socketRepo.unregisterClient(client, docId);
  }
}
