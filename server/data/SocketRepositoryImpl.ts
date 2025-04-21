import { SocketRepository } from '../domain/repositories/SocketRepository';

export class SocketRepositoryImpl implements SocketRepository {
    async broadcast(docId: string, message: any): Promise<void> {
        // TODO: implement broadcast functionality
    }

    registerClient(client: WebSocket, docId: string): void {
        // TODO: implement regidter client functionality
    }

    unregisterClient(client: WebSocket): void {
        // TODO: implement unregidter client functionality
    }
}