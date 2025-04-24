import { type Message } from "$lib/server/domain/repositories/SocketRepository";

export interface ServerToClientEvents {
  sendMessage: (message: Message) => void;
}
