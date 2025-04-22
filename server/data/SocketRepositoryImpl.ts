import { DocumentId } from "../domain/Document";
import {
  Client,
  Message,
  SocketRepository,
} from "../domain/repositories/SocketRepository";

export class SocketRepositoryImpl implements SocketRepository {
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
