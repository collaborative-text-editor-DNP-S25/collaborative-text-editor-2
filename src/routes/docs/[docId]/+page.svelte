<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  import { api } from "$lib/client/state.svelte";
  import BackButton from "$lib/components/BackButton.svelte";

  let { data }: PageProps = $props();

  let value = $state<string>();
  api.onMessage((msg) => {
    value = msg;
  });

  onMount(() => {
    api.enterDocument({ id: data.docId });
    value = api.getDocument({ id: data.docId });
    return () => {
      api.exitDocument({ id: data.docId });
    };
  });
</script>

<main class="flex h-full w-full flex-col gap-4 p-4">
  <header class="relative flex w-full flex-row items-center justify-center">
    <div class="absolute left-0">
      <BackButton />
    </div>

    <h1 class="text-xl font-bold">
      {data.docId}
    </h1>
  </header>

  <textarea
    class="focus:border-ctp-blue border-ctp-overlay0 h-full w-full resize-none rounded-xl border-2 p-2 outline-none"
    bind:value
    oninput={(ev) => {
      api.updateDocument(
        { id: data.docId },
        (ev as unknown as { target: { value: string } }).target.value,
      );
    }}
  ></textarea>
</main>
