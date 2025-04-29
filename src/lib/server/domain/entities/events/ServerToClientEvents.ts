import type { DocumentId, VersionEntry } from "../DocumentEntity";
import type { ResponseMessage } from "../ResponseMessage";

export interface ServerToClientEvents {
  sendUpdateMessage: (message: ResponseMessage) => void;
  sendDocumentIds: (documentIds: DocumentId[]) => void;
  sendDocument: (documentContent: ResponseMessage) => void;
  sendVersionHistory: (versionHistory: VersionEntry[]) => void;
}
