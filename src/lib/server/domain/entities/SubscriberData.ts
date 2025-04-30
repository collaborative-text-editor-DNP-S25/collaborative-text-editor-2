import { type DocumentId } from "./DocumentEntity";

// Implemented publisher/subscriber architecture requires us to use subcribers
// Metadata attached to socket connections
export interface SubscriberData {
  docId?: DocumentId; // Track which document client is viewing
}
