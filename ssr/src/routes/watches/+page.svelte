<script lang="ts">
  import { Search, X } from 'lucide-svelte'
  import { writable } from 'svelte/store'
  import { answersList } from '$lib/stores'

  import watches from '$lib/data/watches.json'
  import type Watch from '$lib/interfaces/watch.interface'
  import type { WatchesData } from '$lib/interfaces/data.interface'

  /** @type {import('./$types').PageData} */
  export let data: WatchesData

  const watchesFilter = writable<Array<Watch>>([])
  const searchInput = writable<string>()
  const searchedWatches = writable<Array<Watch>>([])

  $: {
    if (data.watchesFilter != undefined) {
      watchesFilter.set(data.watchesFilter)
    }
  }

  const filterWatches = () => {
    console.log('filter ', $watchesFilter)
    if ($watchesFilter != undefined && $watchesFilter.length > 0) {
      const w = $watchesFilter.filter((watch) => {
        return watch.watch.toLowerCase().includes($searchInput.toLowerCase())
      })
      const b = $watchesFilter.filter((watch) => {
        return watch.brand.toLowerCase().includes($searchInput.toLowerCase())
      })
      const t = $watchesFilter.filter((watch) => {
        return watch.type.toLowerCase().includes($searchInput.toLowerCase())
      })
      const res = Array.from(new Set([...w, ...b, ...t]))
      searchedWatches.set(res)
    } else {
      const w = watches.filter((watch) => {
        return watch.watch.toLowerCase().includes($searchInput.toLowerCase())
      })
      const b = watches.filter((watch) => {
        return watch.brand.toLowerCase().includes($searchInput.toLowerCase())
      })
      const t = watches.filter((watch) => {
        return watch.type.toLowerCase().includes($searchInput.toLowerCase())
      })
      const res = Array.from(new Set([...w, ...b, ...t]))
      searchedWatches.set(res)
    }
  }

  const removeFilters = () => {
    $watchesFilter = []
    $answersList = []
    $searchedWatches = []
    $searchInput = ''
  }

  console.log('watchesFilter', $watchesFilter)
</script>

<svelte:head>
  <title>Watches</title>
  <meta name="description" content="Collection of all the watches" />
  <link rel="canonical" href="https://watchmatcherssr.tobybostoen.be/watches" />
</svelte:head>

<main>
  <h1 class="text-5xl text-center font-classic">Watches</h1>
  <div class="flex flex-col sm:grid sm:grid-cols-10 mx-auto sm:mx-12">
    <div
      class="col-start-3 col-end-9 md:col-start-4 md:col-end-8 flex
      justify-between px-4 py-2 items-center border border-solid
      border-neutral-200 rounded-md">
      <input
        bind:value={$searchInput}
        on:change={filterWatches}
        type="text"
        placeholder="Search for a brand"
        class="rounded-md outline-none border-none w-full font-text text-xl" />
      <button
        on:click={filterWatches}
        class="border-none bg-transparent cursor-pointer group flex">
        <Search class="relative right-0 group-hover:text-emerald-700" />
        <p class="w-0 h-0 text-transparent">Search</p>
      </button>
    </div>
    {#if $answersList != undefined && $answersList != null && $searchedWatches != undefined && $searchedWatches != null}
      {#if $answersList.length > 0 || $searchedWatches.length > 0}
        <button
          on:click={removeFilters}
          class="mx-auto w-1/2 sm:w-full mt-4 sm:mt-0 cursor-pointer
          bg-transparent p-0 col-start-10 min-w-min col-end-11 px-4 py-2 border
          border-solid border-neutral-200 rounded-md flex items-center font-text
          group">
          <p class="m-0 group-hover:text-emerald-700 text-xsm">Remove filter</p>
          <X class="text-neutral-600 group-hover:text-emerald-700" />
        </button>
      {/if}
    {/if}
  </div>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16
    m-20 font-text">
    {#if $watchesFilter.length > 0}
      {#if $searchedWatches.length != 0}
        {#each $searchedWatches as watch, index}
          <div
            class="flex flex-col h-full border-2 border-solid border-neutral-200
            bg-neutral-200 p-2 rounded-md drop-shadow-md">
            <div
              class="aspect-square flex overflow-hidden justify-center
              rounded-md">
              {#await data.watches}
                <div
                  class="w-full h-full rounded-md bg-neutral-300 animate-pulse" />
              {:then images}
                <img
                  src={images.find((img) =>
                    img.includes(
                      watch.type.replaceAll(' ', '-').toLocaleUpperCase(),
                    ),
                  )}
                  alt="The {watch.brand}
                  {watch.type} watch."
                  width="100%"
                  height="100%"
                  class="object-scale-down" />
              {/await}
            </div>
            <div class="flex flex-col flex-auto">
              <div class="text-center">
                <p class="text-neutral-600 mb-2">
                  {watch.brand} - {watch.watch}
                </p>
                <h2 class="mt-0">{watch.type}</h2>
              </div>
              <div class="self-center flex items-end flex-1">
                <a
                  href="/watches/{watch.type
                    .replaceAll(' ', '-')
                    .toLocaleLowerCase()}"
                  class="no-underline outline-none bg-emerald-700 text-white
                  rounded-md px-4 py-2">
                  View
                </a>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        {#each $watchesFilter as watch, index}
          <div
            class="flex flex-col h-full border-2 border-solid border-neutral-200
            bg-neutral-200 p-2 rounded-md drop-shadow-md">
            <div
              class="aspect-square flex overflow-hidden justify-center
              rounded-md">
              {#await data.watches}
                <div
                  class="w-full h-full rounded-md bg-neutral-300 animate-pulse" />
              {:then images}
                <img
                  src={images.find((img) =>
                    img.includes(
                      watch.type.replaceAll(' ', '-').toLocaleUpperCase(),
                    ),
                  )}
                  alt="The {watch.brand}
                  {watch.type} watch."
                  width="100%"
                  height="100%"
                  class="object-scale-down" />
              {/await}
            </div>
            <div class="flex flex-col flex-auto">
              <div class="text-center">
                <p class="text-neutral-600 mb-2">
                  {watch.brand} - {watch.watch}
                </p>
                <h2 class="mt-0">{watch.type}</h2>
              </div>
              <div class="self-center flex items-end flex-1">
                <a
                  href="/watches/{watch.type
                    .replaceAll(' ', '-')
                    .toLocaleLowerCase()}"
                  class="no-underline outline-none bg-emerald-700 text-white
                  rounded-md px-4 py-2">
                  View
                </a>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    {:else if $searchedWatches.length != 0}
      {#each $searchedWatches as watch, index}
        <div
          class="flex flex-col h-full border-2 border-solid border-neutral-200
          bg-neutral-200 p-2 rounded-md drop-shadow-md">
          <div
            class="aspect-square flex overflow-hidden justify-center rounded-md">
            {#await data.watches}
              <div
                class="w-full h-full rounded-md bg-neutral-300 animate-pulse" />
            {:then images}
              <img
                src={images.find((img) =>
                  img.includes(
                    watch.type.replaceAll(' ', '-').toLocaleUpperCase(),
                  ),
                )}
                alt="The {watch.brand}
                {watch.type} watch."
                width="100%"
                height="100%"
                class="object-scale-down" />
            {/await}
          </div>
          <div class="flex flex-col flex-auto">
            <div class="text-center">
              <p class="text-neutral-600 mb-2">{watch.brand} - {watch.watch}</p>
              <h2 class="mt-0">{watch.type}</h2>
            </div>
            <div class="self-center flex items-end flex-1">
              <a
                href="/watches/{watch.type
                  .replaceAll(' ', '-')
                  .toLocaleLowerCase()}"
                class="no-underline outline-none bg-emerald-700 text-white
                rounded-md px-4 py-2">
                View
              </a>
            </div>
          </div>
        </div>
      {/each}
    {:else}
      {#each watches as watch, index}
        <div
          class="flex flex-col h-full border-2 border-solid border-neutral-200
          bg-neutral-200 p-2 rounded-md drop-shadow-md">
          <div
            class="aspect-square flex overflow-hidden justify-center rounded-md">
            {#await data.watches}
              <div
                class="w-full h-full bg-neutral-300 animate-pulse rounded-md" />
            {:then images}
              <img
                src={images.find((img) =>
                  img.includes(
                    watch.type.replaceAll(' ', '-').toLocaleUpperCase(),
                  ),
                )}
                alt="The {watch.brand}
                {watch.type} watch."
                width="100%"
                height="100%"
                class="object-scale-down" />
            {/await}
          </div>
          <div class="flex flex-col flex-auto">
            <div class="text-center">
              <p class="text-neutral-600 mb-2">{watch.brand} - {watch.watch}</p>
              <h2 class="mt-0">{watch.type}</h2>
            </div>
            <div class="self-center flex items-end flex-1">
              <a
                href="/watches/{watch.type
                  .replaceAll(' ', '-')
                  .toLocaleLowerCase()}"
                class="no-underline outline-none bg-emerald-700 text-white
                rounded-md px-4 py-2">
                View
              </a>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </section>
</main>
