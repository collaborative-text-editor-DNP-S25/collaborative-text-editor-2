import DocumentRepositoryImpl from "$lib/backend/data/DocumentRepositoryImpl";
import SocketRepositoryImpl from "$lib/backend/data/SocketRepositoryImpl";

class MainApiClass {
  docRepo = new DocumentRepositoryImpl();
  sockRepo = new SocketRepositoryImpl();
}
