import { type Handle, type ServerInit } from "@sveltejs/kit";

import { paraglideMiddleware } from "$lib/paraglide/server";

// @ts-expect-error: ignore ts(2307)
import { WS_PORT } from "$env/static/private";
import MainApi from "$lib/server/api/MainApi";

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) =>
        html.replace("%paraglide.lang%", locale),
    });
  });

const initServer: ServerInit = () => {
  const portString = WS_PORT as string;
  const portNumber = Number.parseInt(portString);
  const mainApi = new MainApi();
  mainApi.start(portNumber);
};

export const handle: Handle = ({ event, resolve }) => {
  return handleParaglide({ event, resolve });
};

export const init: ServerInit = async () => {
  return initServer();
};
