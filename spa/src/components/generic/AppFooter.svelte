<script lang="ts">
  import { Link } from 'svelte-routing'
</script>

<footer class="bg-zinc-100 m-0 p-12 px-20 font-text">
  <div class="flex h-full gap-12">
    <h1 class="font-classic text-6xl p-12">Watchmatcher</h1>
    <div class="flex flex-col border-0 pl-12 border-l-2 border-solid">
      <h4>Top watches</h4>
      <div class="flex flex-col gap-4">
        <Link
          to="/watches/rolex"
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          >Rolex</Link>
        <Link
          to="/watches/tissot"
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          >Tissot</Link>
        <Link
          to="/watches/audemars-piguet"
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          >Audemars Piguet</Link>
        <Link
          to="/watches/hublot"
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          >Hublot</Link>
      </div>
    </div>
    <div class="flex-auto"/>
    <div class="flex flex-col">
        <h4>Contact</h4>
        <div class="flex flex-col gap-4">
            <a class="no-underline text-black hover:text-emerald-700 hover:underline" href="mailto:toby.bostoen@student.howest.be">toby.bostoen@student.howest.be</a>
            <a class="no-underline text-black hover:text-emerald-700 hover:underline" href="tel:+32493580592">+32 493 58 05 92</a>
        </div>
    </div>
  </div>
</footer>
