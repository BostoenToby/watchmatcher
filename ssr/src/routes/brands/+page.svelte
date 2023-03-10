<script lang="ts">
  import { Search } from 'lucide-svelte'
  import type Brand from '$lib/interfaces/brand.interface'
  import { writable } from 'svelte/store'

  import brands from '$lib/data/brands.json'
  import type { Images } from '$lib/interfaces/data.interface'

  /** @type {import('./$types').PageData} */
  export let data: Images

  const searchInput = writable<string>()
  const filteredBrands = writable<Array<Brand>>([])

  const filterBrands = () => {
    const res = brands.filter((brand) => {
      return brand.name.toLowerCase().includes($searchInput.toLowerCase())
    })
    filteredBrands.set(res)
  }
</script>

<svelte:head>
  <title>Brands</title>
  <meta name="description" content="Collection of all the brands" />
  <link rel="canonical" href="https://watchmatcherssr.tobybostoen.be/brands" />
</svelte:head>

<main>
  <h1 class="text-5xl text-center font-classic">Brands</h1>
  <div class="grid grid-cols-10 mx-12">
    <div
      class="col-start-2 col-end-9 md:col-start-4 md:col-end-8 w-full mx-auto
      flex justify-between px-4 py-2 items-center border border-solid
      border-neutral-200 rounded-md">
      <input
        bind:value={$searchInput}
        on:change={filterBrands}
        type="text"
        placeholder="Search for a brand"
        class="rounded-md outline-none border-none w-full font-text text-xl" />
      <button
        on:click={filterBrands}
        class="border-none bg-transparent cursor-pointer group flex">
        <Search class="relative right-0 group-hover:text-emerald-700" />
        <p class="hidden">Search</p>
      </button>
    </div>
  </div>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16
    m-20 font-text">
    {#if $filteredBrands.length != 0}
      {#each $filteredBrands as brand, index}
        <div
          class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2
          rounded-md drop-shadow-md">
          <div
            class="aspect-square flex overflow-hidden justify-center rounded-md">
            {#await data.images}
              <div
                class="w-4/5 h-full bg-neutral-300 rounded-md animate-pulse" />
            {:then img}
              <img
                src={img.find((images) => {
                  return images.includes(brand.name
                      .replaceAll(' ', '-')
                      .toLocaleLowerCase())
                })}
                height="100%"
                width="100%"
                alt="The logo of {brand.name}"
                class="object-scale-down" />
            {/await}
          </div>
          <div class="flex flex-col justify-between">
            <div class="text-center">
              <p class="text-neutral-600 mb-2">
                {brand.foundingDate}, {brand.country}
              </p>
              <h2 class="mt-0 text-lg text-center">{brand.name}</h2>
            </div>
            <a
              href="/brands/{brand.name.replace(' ', '-').toLocaleLowerCase()}"
              class="no-underline outline-none self-center bg-emerald-700
              text-white rounded-md px-4 py-2">
              View
            </a>
          </div>
        </div>
      {/each}
    {:else}
      {#each brands as brand, index}
        <div
          class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2
          rounded-md drop-shadow-md">
          <div
            class="aspect-square flex overflow-hidden justify-center rounded-md">
            {#await data.images}
              <div
                class="w-4/5 h-full bg-neutral-300 rounded-md animate-pulse" />
            {:then img}
              <img
                src={img.find((images) => {
                  return images.includes(brand.name
                      .replaceAll(' ', '-')
                      .toLocaleLowerCase())
                })}
                height="100%"
                width="100%"
                alt="The logo of {brand.name}"
                class="object-scale-down" />
            {/await}
          </div>
          <div class="flex flex-col">
            <div class="text-center">
              <p class="text-neutral-600 mb-2">
                {brand.foundingDate}, {brand.country}
              </p>
              <h2 class="mt-0 text-lg text-center">{brand.name}</h2>
            </div>
            <a
              href="/brands/{brand.name.replace(' ', '-').toLocaleLowerCase()}"
              class="no-underline outline-none self-center bg-emerald-700
              text-white rounded-md px-4 py-2">
              View
            </a>
          </div>
        </div>
      {/each}
    {/if}
  </section>
</main>
