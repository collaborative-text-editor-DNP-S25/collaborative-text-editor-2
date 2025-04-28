import { type Handle, type ServerInit } from "@sveltejs/kit";

import { paraglideMiddleware } from "$lib/paraglide/server";

// @ts-expect-error: ignore ts(2307)
import { WS_PORT } from "$env/static/private";
import ServerApi from "$lib/server/api/ServerApi";

// // @ts-expect-error: ignore ts(2307)
// import { SERVER_URL } from "$env/static/private";
// import { ClientApi } from "$lib/server/api/ClientApi";

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
  const serverApi = new ServerApi();
  serverApi.start(portNumber);
};

// const initClient = () => {
//   const serverUrl = SERVER_URL as string;
//   const clientApi = new ClientApi(serverUrl);

//   clientApi.onMessage((message) => {
//     console.log(message);
//   });
//   clientApi.onGetAllDocuments((documentIds) => {
//     console.log(documentIds);
//   });

//   clientApi.createDocument();
//   clientApi.enterDocument({ id: "doc-0" });
//   clientApi.updateDocument({ id: "doc-0" }, "doc update");
//   clientApi.getAllDocuments();

//   return clientApi;
// };

export const handle: Handle = ({ event, resolve }) => {
  // initClient();
  return handleParaglide({ event, resolve });
};

export const init: ServerInit = async () => {
  return initServer();
};
