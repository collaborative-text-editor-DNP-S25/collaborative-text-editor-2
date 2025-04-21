"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRepositoryImpl = void 0;
var DocumentRepositoryImpl = /** @class */ (function () {
    function DocumentRepositoryImpl() {
        this.io = require("socket.io")(3001, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
            },
        });
    }
    DocumentRepositoryImpl.prototype.createDocument = function () {
        // TODO: implement create doc implementation
        return new Promise(function (resolve, reject) {
            var documentId = "1";
            resolve(documentId);
        });
    };
    DocumentRepositoryImpl.prototype.getDocument = function (docId) {
        return new Promise(function (resolve, reject) {
            // TODO: implement get doc functionality
            resolve(null);
        });
    };
    DocumentRepositoryImpl.prototype.updateDocument = function (docId, document) {
        return new Promise(function (resolve, reject) {
            // TODO: implement update doc functionality
            resolve();
        });
    };
    return DocumentRepositoryImpl;
}());
exports.DocumentRepositoryImpl = DocumentRepositoryImpl;
console.log("1");
var repo = new DocumentRepositoryImpl();
console.log("2");
