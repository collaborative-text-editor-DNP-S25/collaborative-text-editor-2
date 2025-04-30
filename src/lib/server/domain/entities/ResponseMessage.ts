import type { DocumentEntity } from "./DocumentEntity";

export type ResponseMessage = Success | Error;

// Successful response
interface Success {
  ok: true;
  data: DocumentEntity; // Contains actual document data
}

// Failure response
interface Error {
  ok: false;
}
