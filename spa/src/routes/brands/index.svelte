<script lang="ts">
  import { Link } from 'svelte-routing'
  import { Search } from 'lucide-svelte'
  import { writable } from 'svelte/store'

  import AppHolder from '../../components/holders/AppHolder.svelte'
  import brands from '../../assets/brands.json'
  import type Brand from '../../interfaces/brand.interface'

  const searchInput = writable<string>()
  const filteredWatches = writable<Array<Brand>>([])

  const filterBrands = () => {
    const res = brands.filter((brand) => {
      return brand.name.toLowerCase().includes($searchInput.toLowerCase())
    })
    filteredWatches.set(res)
  }
</script>

<AppHolder>
  <h1 class="text-5xl text-center font-classic">Brands</h1>
  <div class="grid grid-cols-10 mx-12">
    <div
      class="col-start-4 col-end-8 w-full mx-auto flex justify-between px-4 py-2 items-center border border-solid border-neutral-200 rounded-md">
      <input
        bind:value={$searchInput}
        on:change={filterBrands}
        type="text"
        placeholder="Search for a brand"
        class="rounded-md outline-none border-none w-full font-text text-xl" />
      <button
        on:click={filterBrands}
        class="border-none bg-transparent cursor-pointer group"
        ><Search class="relative right-0 group-hover:text-emerald-700" /></button>
    </div>
  </div>
  <section class="grid grid-cols-4 gap-16 m-20 font-text">
    {#if $filteredWatches.length != 0}
      {#each $filteredWatches as brand}
        <div
          class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
          <div
            class="aspect-square flex overflow-hidden justify-center rounded-md">
            <img
              src="/brands/{brand.name
                .replace(' ', '-')
                .toLocaleLowerCase()}.webp"
              alt=""
              class="object-scale-down w-4/5" />
          </div>
          <div class="flex justify-between">
            <div>
              <p class="text-neutral-600 mb-2">
                {brand.foundingDate}, {brand.country}
              </p>
              <h3 class="mt-0">{brand.name}</h3>
            </div>
            <Link
              to="/brands/{brand.name.replace(' ', '-').toLocaleLowerCase()}"
              class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2"
              >View</Link>
          </div>
        </div>
      {/each}
    {:else}
      {#each brands as brand}
        <div
          class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
          <div
            class="aspect-square flex overflow-hidden justify-center rounded-md">
            <img
              src="/brands/{brand.name
                .replace(' ', '-')
                .toLocaleLowerCase()}.webp"
              alt=""
              class="object-scale-down w-4/5" />
          </div>
          <div class="flex justify-between">
            <div>
              <p class="text-neutral-600 mb-2">
                {brand.foundingDate}, {brand.country}
              </p>
              <h3 class="mt-0">{brand.name}</h3>
            </div>
            <Link
              to="/brands/{brand.name.replace(' ', '-').toLocaleLowerCase()}"
              class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2"
              >View</Link>
          </div>
        </div>
      {/each}
    {/if}
  </section>
</AppHolder>
