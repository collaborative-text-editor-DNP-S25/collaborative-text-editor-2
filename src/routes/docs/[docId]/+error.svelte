<script lang="ts">
  import { page } from "$app/state";
</script>

<main>{page.status}: {page.error?.message}</main>
