export interface DocumentId {
  id: string;
}
export type DocumentContent = string;

export interface VersionEntry {
  content: DocumentContent;
  timestamp: Date;
}

export interface Document {
  id: DocumentId;
  content: DocumentContent;
  timestamp: Date;
  versionHistory: VersionEntry[];
  currentVersionIndex: number;
}
