<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  import { api } from "$lib/client/state.svelte";
  import BackButton from "$lib/components/BackButton.svelte";
  import { m } from "$lib/paraglide/messages";
  import type { DocumentEntity } from "$lib/server/domain/entities/DocumentEntity";

  let { data }: PageProps = $props();

  let document = $state<DocumentEntity>();
  let anyUpdates = $state(false);
  let value = $state<string>();
  $effect(() => {
    if (document !== undefined) {
      if (document.versionHistory.length > 0) {
        anyUpdates = true;
      }
      value = document.content;
    } else {
      value = "";
    }
  });

  api.onMessage((msg) => {
    if (msg.ok) {
      document = msg.data;
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
      <span>{data.docId}</span>
      {#if document !== undefined}
        <span class="text-ctp-subtext0">/</span>
        <span>{anyUpdates ? document.currentVersionIndex + 1 : 0}</span>
      {/if}
    </h1>

    <div class="absolute right-0 flex flex-row gap-2">
      <button
        class="active:text-ctp-blue active:bg-ctp-surface1 hover:bg-ctp-surface0 flex w-20 items-center justify-center rounded-md p-2 font-medium hover:font-bold"
        onclick={() => {
          if (
            document !== undefined &&
            document.currentVersionIndex + 1 !== 1
          ) {
            api.undo({ id: data.docId });
          }
        }}>{m.undo()}</button
      >
      <button
        class="active:text-ctp-blue active:bg-ctp-surface1 hover:bg-ctp-surface0 flex w-20 items-center justify-center rounded-md p-2 font-medium hover:font-bold"
        onclick={() => api.redo({ id: data.docId })}>{m.redo()}</button
      >
    </div>
  </header>

  <div class="flex h-full flex-row gap-4">
    <textarea
      class="focus:border-ctp-blue border-ctp-overlay0 h-full w-full resize-none rounded-xl border-2 p-2 outline-none"
      bind:value
      oninput={(ev) => {
        anyUpdates = true;
        api.updateDocument(
          { id: data.docId },
          (ev as unknown as { target: { value: string } }).target.value,
        );
      }}
      onkeydown={(ev) => {
        if (ev.ctrlKey) {
          if (
            (ev.shiftKey && ev.key.toLowerCase() == "z") ||
            ev.key.toLowerCase() == "y"
          ) {
            ev.preventDefault();
            api.redo({ id: data.docId });
          } else if (!ev.shiftKey && ev.key.toLowerCase() == "z") {
            ev.preventDefault();
            if (
              document !== undefined &&
              document.currentVersionIndex + 1 !== 1
            ) {
              api.undo({ id: data.docId });
            }
          }
        }
      }}
    ></textarea>

    <ul
      class="border-ctp-overlay0 flex h-120 w-96 flex-col gap-3 overflow-y-scroll rounded-xl border-2 p-3"
    >
      {#if document !== undefined}
        {#each document.versionHistory.toReversed() as version, i (i)}
          <li class="w-full">
            <flex class="flex flex-row justify-between">
              <span class="font-medium">
                {version.versionIndex + 2}
              </span>
              <time class="text-ctp-subtext0">
                {version.timestamp}
              </time>
            </flex>
            <button
              class="{version.versionIndex + 1 == document.currentVersionIndex
                ? 'bg-ctp-green-900 hover:bg-ctp-green-700 active:bg-ctp-green-500 text-ctp-base'
                : 'bg-ctp-surface0 hover:bg-ctp-surface1 active:bg-ctp-surface2'} flex min-h-8 w-full flex-col rounded-lg px-2 py-1 text-left font-medium hover:cursor-pointer"
              onclick={() => {
                api.jump({ id: data.docId }, version.versionIndex);
              }}
            >
              <p class="truncate">
                {version.content}
              </p>
            </button>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
</main>
