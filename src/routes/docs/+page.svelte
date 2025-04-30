<script lang="ts">
  import { api, documentIds } from "$lib/client/state.svelte";
  import { m } from "$lib/paraglide/messages";

  let className =
    "bg-ctp-surface0 justify-center font-medium hover:font-bold active:text-ctp-blue items-center flex hover:bg-ctp-surface1 active:bg-ctp-surface2 h-16 w-28 rounded-md hover:cursor-pointer";
</script>

<main class="flex h-full w-full flex-col gap-4 p-4">
  <button
    class="active:text-ctp-blue active:bg-ctp-surface1 hover:bg-ctp-surface0 flex w-20 items-center justify-center rounded-md p-2 font-medium hover:font-bold"
    onclick={() => api.getAllDocuments()}
  >
    {m.refresh()}
  </button>

  <ul class="flex flex-row flex-wrap gap-4">
    <button
      class={className}
      onclick={() => {
        api.createDocument();
        api.getAllDocuments();
      }}
    >
      {m.newDocument()}
    </button>

    {#each documentIds.value as docId, i (i)}
      <li class="group relative">
        <button
          class="hover:bg-ctp-overlay0 active:bg-ctp-red-800 invisible absolute right-0 flex size-6 items-center justify-center rounded-full font-medium group-hover:visible"
          onclick={() => {
            api.deleteDocument(docId);
            api.getAllDocuments();
          }}
        >
          x
        </button>
        <a href={docId.id} class={className}>
          {docId.id}
        </a>
      </li>
    {/each}
  </ul>
</main>
