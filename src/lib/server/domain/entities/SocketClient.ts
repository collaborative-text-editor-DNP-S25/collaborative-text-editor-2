import { Socket } from "socket.io";

import { type ClientToServerEvents } from "./events/ClientToServerEvents";
import { type ServerToClientEvents } from "./events/ServerToClientEvents";
import { type SubscriberData } from "./SubscriberData";

export type SocketClient = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  never,
  SubscriberData
>;
