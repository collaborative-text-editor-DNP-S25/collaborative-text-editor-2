import type { DocumentEntity } from "./DocumentEntity";

export type ResponseMessage = Success | Error;

// Successful response payload
interface Success {
  ok: true;
  data: DocumentEntity; // Contains actual document data
}

// Failure response payload
interface Error {
  ok: false;
}
