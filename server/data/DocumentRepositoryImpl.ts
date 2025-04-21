import { DocumentRepository } from '../domain/repositories/DocumentRepository';

export class DocumentRepositoryImpl implements DocumentRepository {
    io = require("socket.io")(3001, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    })


    async createDocument(): Promise<string> {
        // TODO: implement create doc functionality
        return new Promise((resolve, reject) => {
            const documentId = "1";
            resolve(documentId);
        });
    }

    async getDocument(docId: string): Promise<Document | null> {
        return new Promise((resolve, reject) => {
            // TODO: implement get doc functionality
            resolve(null);
        });
    }

    async updateDocument(docId: string, document: Document): Promise<void> {
        return new Promise((resolve, reject) => {
            // TODO: implement update doc functionality
            resolve();
        });
    }
}
