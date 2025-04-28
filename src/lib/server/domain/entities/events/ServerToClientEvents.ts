import type { DocumentId } from "../Document";
import type { ResponseMessage } from "../ResponseMessage";

export interface ServerToClientEvents {
  sendMessage: (message: ResponseMessage) => void;
  sendDocumentIds: (documentIds: DocumentId[]) => void;
  sendDocument: (documentContent: ResponseMessage) => void;
}
