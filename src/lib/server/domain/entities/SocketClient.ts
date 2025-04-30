import { Socket } from "socket.io";

import { type ClientToServerEvents } from "./events/ClientToServerEvents";
import { type ServerToClientEvents } from "./events/ServerToClientEvents";
import { type SubscriberData } from "./SubscriberData";

// Type about basic socket for client
export type SocketClient = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  never,
  SubscriberData
>;
