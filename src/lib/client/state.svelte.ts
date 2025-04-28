import { ClientApi } from "$lib/server/api/ClientApi";

export const api = $state(new ClientApi("http://localhost:8952/"));
