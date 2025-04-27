import type { ClientToServerEvents } from "$lib/common/entities/events/ClientToServerEvents";
import type { ServerToClientEvents } from "$lib/common/entities/events/ServerToClientEvents";
import { io, type Socket } from "socket.io-client";

export class ClientApi {
  private io: Socket<ServerToClientEvents, ClientToServerEvents>;
  private callbacks = new Map<string, (message: string) => void>();

  constructor(serverUrl: string) {
    this.io = io(serverUrl, {
      autoConnect: true,
      reconnection: true,
      transports: ["websocket"],
    });
    this.setupSocketHandlers();
  }

  private setupSocketHandlers() {
    this.io.on("sendMessage", (message) => {
      this.callbacks.forEach((callback) => {
        callback(message);
      });
      console.log(message);
    });

    this.io.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });
  }

  public enterDocument(docId: string): void {
    this.io.emit("enterDocument", docId);
  }

  public exitDocument(docId: string): void {
    this.io.emit("exitDocument", docId);
  }

  public updateDocument(docId: string, newContent: string): void {
    this.io.emit("updateDocument", docId, newContent);
  }
}
