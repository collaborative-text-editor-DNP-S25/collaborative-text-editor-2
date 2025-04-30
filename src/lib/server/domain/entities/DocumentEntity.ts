export interface DocumentId {
  id: string;
}
export type DocumentContent = string;
export type versionIndex = number;

export interface VersionEntry {
  content: DocumentContent;
  timestamp: Date;
  versionIndex: number;
}

export interface DocumentEntity {
  id: DocumentId;
  content: DocumentContent;
  timestamp: Date;
  versionHistory: VersionEntry[];
  currentVersionIndex: number;
}
