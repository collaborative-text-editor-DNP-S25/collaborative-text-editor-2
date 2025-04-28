import type { PageLoad } from "./$types";

import { api } from "$lib/client/state.svelte";

export const trailingSlash = "always";

export const load: PageLoad = () => {
  api.getAllDocuments();
};
