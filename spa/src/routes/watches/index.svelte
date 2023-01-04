<script lang="ts">
  import { Link } from 'svelte-routing'
  import AppHolder from '../../components/holders/AppHolder.svelte'
</script>

<AppHolder>
  <h1 class="text-5xl text-center font-classic">Watches</h1>
  <section class="grid grid-cols-4 gap-16 m-20 font-text">
    <div
      class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
      <div class="aspect-square flex overflow-hidden justify-center rounded-md">
        <img src="/watches/rolex-OYSTER-PERPETUAL.webp" alt="" class="max-h-full" />
      </div>
      <div class="flex justify-between">
        <div>
          <p class="text-neutral-600 mb-2">Rolex</p>
          <h3 class="mt-0">OYSTER PERPETUAL</h3>
        </div>
        <Link
          to="/brands/rolex"
          class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2"
          >View</Link>
      </div>
    </div>
    <div
      class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
      <div class="aspect-square flex overflow-hidden justify-center rounded-md">
        <img src="/watches/audemars-piguet-CODE-11,59.png" alt="" class="max-h-full" />
      </div>
      <div class="flex justify-between">
        <div>
          <p class="text-neutral-600 mb-2">Audemars Piguet</p>
          <h3 class="mt-0">CODE 11.59</h3>
        </div>
        <Link
          to="/brands/tissot"
          class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2"
          >View</Link>
      </div>
    </div>
    <div
      class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
      <div class="aspect-square flex overflow-hidden justify-center rounded-md">
        <img src="/watches/audemars-piguet-ROYAL-OAK.png" alt="" class="max-h-full" />
      </div>
      <div class="flex justify-between">
        <div>
          <p class="text-neutral-600 mb-2">Audemars Piguet</p>
          <h3 class="mt-0">ROYAL OAK</h3>
        </div>
        <Link
          to="/brands/audemars-piguet"
          class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2"
          >View</Link>
      </div>
    </div>
    <div
      class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
      <div class="aspect-square flex overflow-hidden justify-center rounded-md">
        <img src="/watches/hublot-INTEGRATED-KING-GOLD-CERAMIC.png" alt="" class="max-h-full" />
      </div>
      <div class="flex justify-between">
        <div>
          <p class="text-neutral-600 mb-2">Hublot</p>
          <h3 class="mt-0">INTEGRATED KING GOLD CERAMIC</h3>
        </div>
        <Link
          to="/brands/patek-philippe"
          class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2"
          >View</Link>
      </div>
    </div>
    <div
      class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
      <div class="aspect-square flex overflow-hidden justify-center rounded-md">
        <img src="/watches/vacheron-constantin-FIFTYSIX-TOURBILLON.webp" alt="" class="max-h-full" />
      </div>
      <div class="flex justify-between">
        <div>
          <p class="text-neutral-600 mb-2">Vacheron Constantin</p>
          <h3 class="mt-0">FIFTYSIX TOURBILLON</h3>
        </div>
        <Link
          to="/brands/hublot"
          class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2"
          >View</Link>
      </div>
    </div>
  </section>
</AppHolder>
