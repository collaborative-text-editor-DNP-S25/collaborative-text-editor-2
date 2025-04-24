import { type DocumentId } from "$lib/server/domain/entities/Document";
import {
  type Client,
  type Message,
  type SocketRepository,
} from "$lib/server/domain/repositories/SocketRepository";

export default class SocketRepositoryImpl implements SocketRepository {
  async broadcast(docId: DocumentId, message: Message): Promise<void> {
    // TODO: implement broadcast functionality
    throw new Error();
  }

  async registerClient(client: Client, docId: DocumentId): Promise<void> {
    // TODO: implement regidter client functionality
    throw new Error();
  }

  async unregisterClient(client: Client): Promise<void> {
    // TODO: implement unregidter client functionality
    throw new Error();
  }
}
