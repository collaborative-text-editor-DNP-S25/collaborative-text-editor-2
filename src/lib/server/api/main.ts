import DocumentRepositoryImpl from "$lib/server/data/DocumentRepositoryImpl";
import SocketRepositoryImpl from "$lib/server/data/SocketRepositoryImpl";

class MainApiClass {
  docRepo = new DocumentRepositoryImpl();
  sockRepo = new SocketRepositoryImpl();
}
