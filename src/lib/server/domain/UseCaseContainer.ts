import { type DocumentRepository } from "$lib/server/domain/repositories/DocumentRepository";
import { type SocketRepository } from "$lib/server/domain/repositories/SocketRepository";
import ConnectToDocumentUseCase from "$lib/server/domain/usecases/ConnectToDocumentUseCase";
import CreateDocumentUseCase from "$lib/server/domain/usecases/CreateDocumentUseCase";
import DeleteDocumentUseCase from "$lib/server/domain/usecases/DeleteDocumentUseCase";
import DisconnectFromDocumentUseCase from "$lib/server/domain/usecases/DisconnectFromDocumentUseCase";
import UpdateDocumenUseCase from "./usecases/UpdateDocumentUseCase";

export default class UseCaseContainer {
  connectToDocument: ConnectToDocumentUseCase;
  createDocument: CreateDocumentUseCase;
  deleteDocument: DeleteDocumentUseCase;
  disconnectFromDocument: DisconnectFromDocumentUseCase;
  updateDocument: UpdateDocumenUseCase;

  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {
    this.connectToDocument = new ConnectToDocumentUseCase(socketRepo);
    this.createDocument = new CreateDocumentUseCase(documentRepo);
    this.deleteDocument = new DeleteDocumentUseCase(documentRepo);
    this.disconnectFromDocument = new DisconnectFromDocumentUseCase(socketRepo);
    this.updateDocument = new UpdateDocumenUseCase(documentRepo, socketRepo);
  }
}
