import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type { SocketClient } from "../entities/SocketClient";
import type SocketRepository from "../repositories/SocketRepository";

export default class GetAllDocumentsUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}

  async invoke(client: SocketClient): Promise<void> {
    const ids = await this.documentRepo.getAllDocuments();
    this.socketRepo.sendAllDocuments(client, ids);
  }
}
