import { DocumentRepositoryImpl } from '../data/DocumentRepositoryImpl';
import { SocketRepositoryImpl } from '../data/SocketRepositoryImpl';

class MainApiClass {
    var docRepo = new DocumentRepositoryImpl();
    var sockRepo = new SocketRepositoryImpl();
}