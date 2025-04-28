<script lang="ts">
  import { goto } from "$app/navigation";

  import { api, documentIds } from "$lib/client/state.svelte";
</script>

{#snippet btn(text: string, callback: () => void)}
  <button
    class="bg-ctp-surface0 hover:bg-ctp-surface1 active:bg-ctp-surface2 h-16 w-32 rounded-md hover:cursor-pointer"
    onclick={callback}
  >
    {text}
  </button>
{/snippet}

<main class="flex h-full w-full flex-col gap-4 p-4">
  <ul class="flex flex-row flex-wrap gap-4">
    {@render btn("Create Document", () => {
      api.createDocument();
      api.getAllDocuments();
    })}

    {#each documentIds.value as docId, i (i)}
      {@render btn(docId.id, () => void goto(docId.id))}
    {/each}
  </ul>
</main>
