export type DocumentId = string;

export default interface Document {
  id: DocumentId;
  content: string;
  timestamp: Date;
  // TODO: declare fields for version history
}
