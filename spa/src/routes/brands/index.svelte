<script lang="ts">
  import { Link } from 'svelte-routing'
  import AppHolder from '../../components/holders/AppHolder.svelte'
</script>

<AppHolder>
  <h1 class="text-5xl text-center font-classic">Brands</h1>
  <section class="grid grid-cols-4 gap-16 m-20 font-text">
    <div class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
      <div class="aspect-square flex overflow-hidden justify-center rounded-md"><img src="/brands/rolex.jpg" alt="" class="max-h-full"></div>
      <div class="flex justify-between">
        <div>
          <p class="text-neutral-600 mb-2">1905, United Kingdom</p>
          <h3 class="mt-0">Rolex</h3>
        </div>
        <Link to="/brands/rolex" class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2">View</Link>
      </div>
    </div>
    <div class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
      <div class="aspect-square flex overflow-hidden justify-center rounded-md"><img src="/brands/tissot.jpg" alt="" class="max-h-full"></div>
      <div class="flex justify-between">
        <div>
          <p class="text-neutral-600 mb-2">1853, Switzerland</p>
          <h3 class="mt-0">Tissot</h3>
        </div>
        <Link to="/brands/tissot" class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2">View</Link>
      </div>
    </div>
    <div class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
      <div class="aspect-square flex overflow-hidden justify-center rounded-md"><img src="/brands/audemars-piguet.jpg" alt="" class="max-h-full"></div>
      <div class="flex justify-between">
        <div>
          <p class="text-neutral-600 mb-2">1875, Switzerland</p>
          <h3 class="mt-0">Audemars Piguet</h3>
        </div>
        <Link to="/brands/audemars-piguet" class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2">View</Link>
      </div>
    </div>
    <div class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
      <div class="aspect-square flex overflow-hidden justify-center rounded-md"><img src="/brands/patek-philippe.jpg" alt="" class="max-h-full"></div>
      <div class="flex justify-between">
        <div>
          <p class="text-neutral-600 mb-2">1839, Switzerland</p>
          <h3 class="mt-0">Patek Philippe</h3>
        </div>
        <Link to="/brands/patek-philippe" class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2">View</Link>
      </div>
    </div>
    <div class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
      <div class="aspect-square flex overflow-hidden justify-center rounded-md"><img src="/brands/hublot.jpg" alt="" class="max-h-full"></div>
      <div class="flex justify-between">
        <div>
          <p class="text-neutral-600 mb-2">1980, Switzerland</p>
          <h3 class="mt-0">Hublot</h3>
        </div>
        <Link to="/brands/hublot" class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2">View</Link>
      </div>
    </div>
  </section>
</AppHolder>
