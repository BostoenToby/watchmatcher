<script>
  import 'uno.css'

  import Header from './Header.svelte'
  import Footer from './Footer.svelte'
</script>

<div class="flex flex-col min-h-screen scrollbar-gutter-auto">
  <Header />
  <slot />
  <Footer />
</div>
