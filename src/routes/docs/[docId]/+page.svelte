<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  import { api } from "$lib/client/state.svelte";
  import BackButton from "$lib/components/BackButton.svelte";

  let { data }: PageProps = $props();

  let value = $state<string>();
  api.onMessage((msg) => {
    if (msg.ok) {
      value = msg.data.content;
    } else {
      alert("Document deleted!");
      void goto("../");
    }
  });

  onMount(() => {
    api.enterDocument({ id: data.docId });
    api.getDocument({ id: data.docId });
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

    <div class="absolute right-0 flex flex-row gap-2">
      <button
        class="active:text-ctp-blue active:bg-ctp-surface1 hover:bg-ctp-surface0 flex w-20 items-center justify-center rounded-md p-2 font-medium hover:font-bold"
        onclick={() => api.undo({ id: data.docId })}>Undo</button
      >
      <button
        class="active:text-ctp-blue active:bg-ctp-surface1 hover:bg-ctp-surface0 flex w-20 items-center justify-center rounded-md p-2 font-medium hover:font-bold"
        onclick={() => api.redo({ id: data.docId })}>Redo</button
      >
    </div>
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
