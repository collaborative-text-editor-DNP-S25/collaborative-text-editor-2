import type { DocumentId } from "../DocumentEntity";
import type { ResponseMessage } from "../ResponseMessage";

// Defines server-initiated socket events
export interface ServerToClientEvents {
  sendUpdateMessage: (message: ResponseMessage) => void; // Real-time doc updates
  // Next functions are self-explanatory
  sendDocumentIds: (documentIds: DocumentId[]) => void;
  sendDocument: (documentContent: ResponseMessage) => void;
}
