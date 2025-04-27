<<<<<<< HEAD
import { type DocumentId } from "$lib/server/domain/entities/Document";
import type { SocketClient } from "$lib/server/domain/entities/SocketClient";
import type { SocketRepository } from "$lib/server/domain/repositories/SocketRepository";
=======
import { type DocumentId } from "$lib/common/entities/Document";
import type { SocketClient } from "$lib/common/entities/SocketClient";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";
>>>>>>> 45aaa7f7207dd2a0b5963b0d5e25f842f341eeaa

export default class EnterDocumenUseCase {
  constructor(private socketRepo: SocketRepository) {}

  async invoke(client: SocketClient, docId: DocumentId): Promise<void> {
    await this.socketRepo.registerClient(client, docId);
  }
}
