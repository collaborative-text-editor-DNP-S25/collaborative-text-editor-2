<script lang="ts">
  let text = $state("");
</script>

<main class="flex h-full w-full flex-col gap-4 p-4">
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
