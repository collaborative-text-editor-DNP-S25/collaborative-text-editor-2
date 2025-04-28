import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import { api, documentIds } from "$lib/client/state.svelte";

export const load: PageServerLoad = ({ params }) => {
  api.getAllDocuments();
  if (!documentIds.value.map((it) => it.id).includes(params.docId)) {
    error(404);
  }
  return params;
};
