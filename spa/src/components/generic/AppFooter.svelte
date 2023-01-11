<script lang="ts">
  import { Link } from 'svelte-routing'
</script>

<footer
  class="bg-zinc-100 m-0 py-8 sm:px-12 font-text overflow-x-hidden mt-auto">
  <div class="flex flex-col sm:flex-row h-full gap-12">
    <h1 class="font-classic hidden xl:block text-6xl p-12">Watchmatcher</h1>
    <div
      class="flex flex-col min-w-min items-start pl-4 sm:pl-0 border-0 xl:pl-12 border-l-2 xl:border-solid">
      <div class="flex flex-col gap-4">
        <h1 class="text-xl">Top watches</h1>
        <Link
          to="/brands/rolex"
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          >Rolex</Link>
        <Link
          to="/brands/tissot"
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          >Tissot</Link>
        <Link
          to="/brands/audemars-piguet"
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          >Audemars Piguet</Link>
        <Link
          to="/brands/hublot"
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          >Hublot</Link>
      </div>
    </div>
    <div class="flex-auto" />
    <div class="flex flex-col items-start pl-4 sm:pl-0">
      <div class="flex flex-col gap-4">
        <h1 class="text-xl">Contact</h1>
        <a
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          href="mailto:toby.bostoen@student.howest.be"
          >toby.bostoen@student.howest.be</a>
        <a
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          href="tel:+32493580592">+32 493 58 05 92</a>
      </div>
    </div>
  </div>
</footer>
