<script lang="ts">
  import { goto } from "$app/navigation";
  import { error } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  import { api } from "$lib/client/state.svelte";

  let { data }: PageProps = $props();

  let text = $state<string>();
  api.onMessage((msg) => {
    text = msg;
  });
  $effect(() => {
    if (text !== undefined) {
      try {
        api.updateDocument({ id: data.docId }, text);
      } catch {
        error(404);
      }
    }
  });

  onMount(() => {
    api.enterDocument({ id: data.docId });
    return () => {
      api.exitDocument({ id: data.docId });
    };
  });
</script>

<main class="flex h-full w-full flex-col gap-4 p-4">
  <button onclick={() => void goto("../")}>Back</button>
  <h1>
    {data.docId}
  </h1>

  <span
    class="bg-ctp-surface0 h-32 truncate rounded-xl p-2 whitespace-pre-line"
  >
    {text}
  </span>

  <textarea
    class="focus:border-ctp-blue border-ctp-overlay0 h-full w-full resize-none rounded-xl border-2 p-2 outline-none"
    bind:value={text}
  ></textarea>
</main>
