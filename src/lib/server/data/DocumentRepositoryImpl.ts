import {
  type DocumentEntity,
  type DocumentId,
  type VersionEntry,
  type versionIndex,
} from "$lib/server/domain/entities/DocumentEntity";
import type DocumentRepository from "$lib/server/domain/repositories/DocumentRepository";

import { Pool } from "pg";
const pool = new Pool({ /* your PostgreSQL config */ });


// Implementation of the Document Repo functionality
export default class DocumentRepositoryImpl implements DocumentRepository {
  private readonly ERROR_DOC_ID: DocumentId = { id: "doc-errorId" }; // Uniform type of non-existent/error document

  async createDocument(): Promise<DocumentId> {
    const client = await pool.connect();
    try {
        const docIdResult = await client.query(
            "INSERT INTO documents (id, content, timestamp, current_version_index) VALUES ('doc-' || nextval('doc_id_seq'), $1, $2, $3) RETURNING id",
            ['', new Date(), 0]
        );
        return { id: docIdResult.rows[0].id };
    } finally {
        client.release();
    }
  }

  async getDocument(docId: DocumentId): Promise<DocumentEntity | undefined> {
      const client = await pool.connect();
      try {
          const docRes = await client.query(
              'SELECT * FROM documents WHERE id = $1',
              [docId.id]
          );
          if (docRes.rowCount === 0) return undefined;

          const versionsRes = await client.query(
              'SELECT * FROM versions WHERE document_id = $1 ORDER BY version_index',
              [docId.id]
          );
          return {
              id: docId,
              content: docRes.rows[0].content,
              timestamp: docRes.rows[0].timestamp,
              versionHistory: versionsRes.rows.map(v => ({
                  content: v.content,
                  timestamp: v.timestamp,
                  versionIndex: v.version_index,
              })),
              currentVersionIndex: docRes.rows[0].current_version_index,
          };
      } finally {
          client.release();
      }
  }

  async updateDocument(docId: DocumentId, document: DocumentEntity): Promise<void> {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const existingDocRes = await client.query(
            'SELECT content, current_version_index FROM documents WHERE id = $1 FOR UPDATE',
            [docId.id]
        );
        if (existingDocRes.rowCount === 0) throw new Error('Document not found');

        const existingContent = existingDocRes.rows[0].content;
        const currentVersionIndex = existingDocRes.rows[0].current_version_index;

        if (document.content !== existingContent) {
            await client.query(
                'DELETE FROM versions WHERE document_id = $1 AND version_index > $2',
                [docId.id, currentVersionIndex]
            );
            const newVersionIndex = currentVersionIndex + 1;
            await client.query(
                'INSERT INTO versions (document_id, version_index, content, timestamp) VALUES ($1, $2, $3, $4)',
                [docId.id, newVersionIndex, document.content, new Date()]
            );
            await client.query(
                'UPDATE documents SET content = $1, timestamp = $2, current_version_index = $3 WHERE id = $4',
                [document.content, new Date(), newVersionIndex, docId.id]
            );
        }
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
  }
  async deleteDocument(docId: DocumentId): Promise<DocumentId> {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'DELETE FROM documents WHERE id = $1 RETURNING id',
            [docId.id]
        );
        if (result.rowCount == null){
          return this.ERROR_DOC_ID;
        }
        return result.rowCount > 0 ? docId : this.ERROR_DOC_ID;
    } finally {
        client.release();
    }
  }

  async undo(docId: DocumentId):  Promise<DocumentEntity | undefined> {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // Get document with lock
        const docRes = await client.query(
            `SELECT content, current_version_index 
            FROM documents 
            WHERE id = $1 
            FOR UPDATE`,
            [docId.id]
        );
        if (docRes.rowCount === 0) return undefined;

        const currentIndex = docRes.rows[0].current_version_index;
        const newIndex = currentIndex - 1;

        // Prevent index from going below -1
        if (newIndex < -1) return undefined;

        // Get previous version content if available
        let newContent = '';
        if (newIndex >= 0) {
            const versionRes = await client.query(
                `SELECT content 
                FROM versions 
                WHERE document_id = $1 
                AND version_index = $2`,
                [docId.id, newIndex]
            );
            if (versionRes.rowCount == null){
                return undefined;
            }
            if (versionRes.rowCount > 0) {
                newContent = versionRes.rows[0].content;
            }
        }

        // Update document
        await client.query(
            `UPDATE documents 
            SET content = $1, 
                timestamp = NOW(), 
                current_version_index = $2 
            WHERE id = $3`,
            [newContent, newIndex, docId.id]
        );
        
        await client.query('COMMIT');
        return this.getDocument(docId);
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
  }

  async redo(docId: DocumentId):  Promise<DocumentEntity | undefined> {
     const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // Get document with lock
        const docRes = await client.query(
            `SELECT current_version_index 
            FROM documents 
            WHERE id = $1 
            FOR UPDATE`,
            [docId.id]
        );
        if (docRes.rowCount === 0) return undefined;

        const currentIndex = docRes.rows[0].current_version_index;
        const newIndex = currentIndex + 1;

        // Verify new index validity
        const versionRes = await client.query(
            `SELECT version_index 
            FROM versions 
            WHERE document_id = $1`,
            [docId.id]
        );
        const maxVersion = Math.max(...versionRes.rows.map(v => v.version_index), -1);
        
        if (newIndex > maxVersion) return undefined;

        // Get version content
        const contentRes = await client.query(
            `SELECT content 
            FROM versions 
            WHERE document_id = $1 
            AND version_index = $2`,
            [docId.id, newIndex]
        );
        if (contentRes.rowCount === 0) return undefined;

        // Update document
        await client.query(
            `UPDATE documents 
            SET content = $1, 
                timestamp = NOW(), 
                current_version_index = $2 
            WHERE id = $3`,
            [contentRes.rows[0].content, newIndex, docId.id]
        );
        
        await client.query('COMMIT');
        return this.getDocument(docId);
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
  }

  async getAllDocuments():  Promise<DocumentId[]> {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT id FROM documents'
        );
        return result.rows.map(row => ({ id: row.id }));
    } finally {
        client.release();
    }
  }

  async jump(docId: DocumentId, verIndex: versionIndex):  Promise<DocumentEntity | undefined> {
   const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // Original code adjustment (+1)
        const targetIndex = verIndex;
        
        // Verify version exists
        const versionRes = await client.query(
            `SELECT content 
            FROM versions 
            WHERE document_id = $1 
            AND version_index = $2`,
            [docId.id, targetIndex]
        );
        if (versionRes.rowCount === 0) return undefined;

        // Update document state
        await client.query(
            `UPDATE documents 
            SET content = $1, 
                timestamp = NOW(), 
                current_version_index = $2 
            WHERE id = $3`,
            [versionRes.rows[0].content, targetIndex, docId.id]
        );
        
        await client.query('COMMIT');
        return this.getDocument(docId);
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
  }

  async getVersionHistory(docId: DocumentId):  Promise<VersionEntry[]> {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT version_index as "versionIndex", 
                    content, 
                    timestamp 
            FROM versions 
            WHERE document_id = $1 
            ORDER BY version_index`,
            [docId.id]
        );
        return result.rows.map(row => ({
            versionIndex: row.versionIndex,
            content: row.content,
            timestamp: row.timestamp
        }));
    } finally {
        client.release();
    }
  }
}
