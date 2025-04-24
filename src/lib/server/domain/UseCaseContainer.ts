import type DocumentRepository from "./repositories/DocumentRepository";
import type SocketRepository from "./repositories/SocketRepository";
import CreateDocumentUseCase from "./usecases/CreateDocumentUseCase";
import DeleteDocumentUseCase from "./usecases/DeleteDocumentUseCase";
import EnterDocumentUseCase from "./usecases/EnterDocumentUseCase";
import ExitDocumentUseCase from "./usecases/ExitDocumentUseCase";
import UpdateDocumenUseCase from "./usecases/UpdateDocumentUseCase";

export default class UseCaseContainer {
  createDocument: CreateDocumentUseCase;
  deleteDocument: DeleteDocumentUseCase;
  enterDocument: EnterDocumentUseCase;
  exitDocument: ExitDocumentUseCase;
  updateDocument: UpdateDocumenUseCase;

  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {
    this.enterDocument = new EnterDocumentUseCase(socketRepo);
    this.createDocument = new CreateDocumentUseCase(documentRepo);
    this.deleteDocument = new DeleteDocumentUseCase(documentRepo);
    this.exitDocument = new ExitDocumentUseCase(socketRepo);
    this.updateDocument = new UpdateDocumenUseCase(documentRepo, socketRepo);
  }
}
