<script lang="ts">
  import AppHeader from '../generic/AppHeader.svelte'
  import AppFooter from '../generic/AppFooter.svelte'
</script>

<main class="flex flex-col min-h-screen scrollbar-gutter-auto">
  <AppHeader />
  <slot />
  <AppFooter />
</main>
