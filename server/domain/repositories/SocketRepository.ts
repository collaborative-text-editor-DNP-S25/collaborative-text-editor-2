export interface SocketRepository {
    broadcast(docId: string, message: any): Promise<void>;
    registerClient(client: any, docId: string): void;
    unregisterClient(client: any): void;
}