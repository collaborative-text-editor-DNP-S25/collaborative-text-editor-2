export type DocumentId = string;
export type DocumentContent = string;

export default interface Document {
  id: DocumentId;
  content: DocumentContent;
  timestamp: Date;
  // TODO: declare fields for version history
}
