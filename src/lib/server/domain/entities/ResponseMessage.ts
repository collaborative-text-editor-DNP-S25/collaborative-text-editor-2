import type { DocumentContent } from "./Document";

export type ResponseMessage = Success | Error;

interface Success {
  ok: true;
  data: DocumentContent;
}

interface Error {
  ok: false;
}
