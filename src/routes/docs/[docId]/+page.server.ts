import type { PageServerLoad } from "./$types";

import { api } from "$lib/client/state.svelte";

export const load: PageServerLoad = ({ params }) => {
  api.getAllDocuments();
  return params;
};
