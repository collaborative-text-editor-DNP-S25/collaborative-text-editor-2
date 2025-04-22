import { DocumentRepositoryImpl } from "../data/DocumentRepositoryImpl";
import { SocketRepositoryImpl } from "../data/SocketRepositoryImpl";

class MainApiClass {
  docRepo = new DocumentRepositoryImpl();
  sockRepo = new SocketRepositoryImpl();
}
