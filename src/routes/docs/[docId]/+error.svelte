<script lang="ts">
  import BackButton from "$lib/components/BackButton.svelte";
  import { m } from "$lib/paraglide/messages";
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
  {m.documentNotFound()}

  <BackButton />
</main>
