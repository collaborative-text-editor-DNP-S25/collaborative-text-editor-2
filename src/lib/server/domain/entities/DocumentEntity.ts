export interface DocumentId {
  id: string;
}
export type DocumentContent = string;
export type versionIndex = number;

// Data structure representing version entity
export interface VersionEntry {
  content: DocumentContent;
  timestamp: Date;
  versionIndex: number;
}

// Core data structure representing document state
export interface DocumentEntity {
  id: DocumentId;
  content: DocumentContent;
  timestamp: Date; // Last modification time
  versionHistory: VersionEntry[]; // Audit trail of changes
  currentVersionIndex: number; // ID of current version
}
