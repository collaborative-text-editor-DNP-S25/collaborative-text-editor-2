import { type DocumentId } from "$lib/server/domain/Document";
import {
  type Client,
  type Message,
  type SocketRepository,
} from "$lib/server/domain/repositories/SocketRepository";

export default class SocketRepositoryImpl implements SocketRepository {
  async broadcast(docId: DocumentId, message: Message): Promise<void> {
    // TODO: implement broadcast functionality
    throw undefined;
  }

  registerClient(client: Client, docId: DocumentId): Promise<void> {
    // TODO: implement regidter client functionality
    throw undefined;
  }

  unregisterClient(client: Client): Promise<void> {
    // TODO: implement unregidter client functionality
    throw undefined;
  }
}
