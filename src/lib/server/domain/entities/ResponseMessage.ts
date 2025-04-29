import type { DocumentEntity } from "./DocumentEntity";

export type ResponseMessage = Success | Error;

interface Success {
  ok: true;
  data: DocumentEntity;
}

interface Error {
  ok: false;
}
