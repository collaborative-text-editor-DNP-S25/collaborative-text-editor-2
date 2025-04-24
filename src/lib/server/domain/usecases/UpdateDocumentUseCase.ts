import type DocumentRepositoryImpl from "$lib/server/data/DocumentRepositoryImpl";
import type SocketRepositoryImpl from "$lib/server/data/SocketRepositoryImpl";

export default class UpdateDocumenUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}
  // TODO: implement use case
}
