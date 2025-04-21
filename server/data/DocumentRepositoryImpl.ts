import { DocumentRepository } from '../domain/DocumentRepositories';

export class DocumentRepositoryImpl implements DocumentRepository {
    io = require("socket.io")(3001, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    })


    createDocument(): Promise<string> {
        // TODO: implement create doc implementation
        return new Promise((resolve, reject) => {
            const documentId = "1";
            resolve(documentId);
        });
    }

    getDocument(docId: string): Promise<Document | null> {
        return new Promise((resolve, reject) => {
            // TODO: implement get doc functionality
            resolve(null);
        });
    }

    updateDocument(docId: string, document: Document): Promise<void> {
        return new Promise((resolve, reject) => {
            // TODO: implement update doc functionality
            resolve();
        });
    }
    deleteDocument(docId: string): Promise<string> {
        return new Promise((resolve, reject) => {
            // TODO: implement delete doc functionality
        })
    }
}
