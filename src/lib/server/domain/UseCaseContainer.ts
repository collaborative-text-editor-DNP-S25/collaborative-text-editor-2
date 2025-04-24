import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";
import EnterDocumentUseCase from "$lib/server/domain/usecases/EnterDocumentUseCase";
import CreateDocumentUseCase from "$lib/server/domain/usecases/CreateDocumentUseCase";
import DeleteDocumentUseCase from "$lib/server/domain/usecases/DeleteDocumentUseCase";
import ExitDocumentUseCase from "$lib/server/domain/usecases/ExitDocumentUseCase";
import UpdateDocumenUseCase from "./usecases/UpdateDocumentUseCase";

export default class UseCaseContainer {
  enterDocument: EnterDocumentUseCase;
  createDocument: CreateDocumentUseCase;
  deleteDocument: DeleteDocumentUseCase;
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
