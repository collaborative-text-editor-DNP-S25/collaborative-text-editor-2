<script lang="ts">
  import { type Snippet } from "svelte";

  import "../app.css";

  let props: {
    children: Snippet;
  } = $props();
</script>

<svelte:head>
  <title>DNP / Project 20.C</title>
</svelte:head>

{@render props.children()}
