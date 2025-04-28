<script lang="ts">
  import { api, documentIds } from "$lib/client/state.svelte";

  let className =
    "bg-ctp-surface0 justify-center font-medium hover:font-bold active:text-ctp-blue items-center flex hover:bg-ctp-surface1 active:bg-ctp-surface2 h-16 w-32 rounded-md hover:cursor-pointer";
</script>

<main class="flex h-full w-full flex-col gap-4 p-4">
  <ul class="flex flex-row flex-wrap gap-4">
    <button
      class={className}
      onclick={() => {
        api.createDocument();
        api.getAllDocuments();
      }}
    >
      Create Document
    </button>

    {#each documentIds.value as docId, i (i)}
      <a href={docId.id} class={className}>
        {docId.id}
      </a>
    {/each}
  </ul>
</main>
