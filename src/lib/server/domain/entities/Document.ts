export type DocumentId = string;
export type DocumentContent = string;

export interface VersionEntry {
  content: DocumentContent;
  timestamp: Date;
}

export default interface Document {
  id: DocumentId;
  content: DocumentContent;
  timestamp: Date;
  versionHistory: VersionEntry[];
}
