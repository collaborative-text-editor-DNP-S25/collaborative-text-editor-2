import { type ClientToServerEvents } from "$lib/server/domain/entities/events/ClientToServerEvents";
import { type ServerToClientEvents } from "$lib/server/domain/entities/events/ServerToClientEvents";
import { type SubscriberData } from "$lib/server/domain/entities/SubscriberData";
import { Socket } from "socket.io";

export type SocketClient = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  never,
  SubscriberData
>;
