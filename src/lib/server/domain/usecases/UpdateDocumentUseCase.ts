import {
  type DocumentContent,
  type DocumentId,
<<<<<<< HEAD
  type Document,
} from "$lib/server/domain/entities/Document";
=======
} from "$lib/common/entities/Document";
>>>>>>> 45aaa7f7207dd2a0b5963b0d5e25f842f341eeaa
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";
import type SocketRepository from "$lib/server/domain/repositories/SocketRepository";

export default class UpdateDocumenUseCase {
  constructor(
    private documentRepo: DocumentRepository,
    private socketRepo: SocketRepository,
  ) {}

  async invoke(docId: DocumentId, newContent: DocumentContent): Promise<void> {
    const document = await this.documentRepo.getDocument(docId);

    const updatedDocument: Document = {
      ...document,
      content: newContent,
      timestamp: new Date(),
    };

    await this.documentRepo.updateDocument(docId, updatedDocument);

    this.socketRepo.broadcast(docId, newContent);
  }
}
