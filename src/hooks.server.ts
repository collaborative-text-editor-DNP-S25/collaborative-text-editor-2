import { type Handle, type ServerInit } from "@sveltejs/kit";

import { paraglideMiddleware } from "$lib/paraglide/server";

import ServerApi from "$lib/server/api/ServerApi";

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) =>
        html.replace("%paraglide.lang%", locale),
    });
  });

const initServer: ServerInit = () => {
  const serverApi = new ServerApi();
  serverApi.start(8952);
};

export const handle: Handle = ({ event, resolve }) => {
  return handleParaglide({ event, resolve });
};

export const init: ServerInit = async () => {
  return initServer();
};
