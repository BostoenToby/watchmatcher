<script lang="ts">
  import { Search, X } from 'lucide-svelte'
  import { writable } from 'svelte/store'
  import { answersList } from '$lib/stores'

  /** @type {import('./$types').PageData} */
  export let data: any

  $: {
    watchesFilter.set(data.watches)
  }

  import watches from '$lib/data/watches.json'
  import type Watch from '$lib/interfaces/watch.interface'

  const watchesFilter = writable<Array<Watch>>([])
  const searchInput = writable<string>()
  const searchedWatches = writable<Array<Watch>>([])
  const images = writable<Array<any>>([])

  const getValue = async (mods: any[]): Promise<any[]> => {
    return new Promise(async (resolve, reject) => {
      const modDefault = []
      for (let m of mods) {
        while (m.default === undefined) {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
        if (m.default != undefined) {
          modDefault.push(m.default)
        }
      }
      if (modDefault.length > 0) {
        resolve(modDefault)
      }
    })
  }

  const getMods = async () => {
    return new Promise(async (resolve, reject) => {
      const modules = await import.meta.glob('$lib/images/watches/*.webp')
      const modList: any[] = []
      for (let watch of watches) {
        for (const path in modules) {
          modules[path]().then((mod: any) => {
            if (
              path.includes(watch.type.replaceAll(' ', '-').toLocaleUpperCase())
            ) {
              if (path.includes('head')) {
                modList.push(mod)
              }
            }
            if (modList.length === watches.length) {
              resolve(modList)
            }
          })
        }
      }
    })
  }

  const getImages = async () => {
    const modList: any = await getMods()
    const res = await getValue(modList)
    images.set(res)
    return res
  }

  const filterWatches = () => {
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
  }

  let promise = getImages()
</script>

<svelte:head>
  <title>Watches</title>
  <meta name="description" content="Collection of all the watches" />
  <link rel="canonical" href="https://watchmatcherssr.tobybostoen.be/watches" />
</svelte:head>

<main>
  <h1 class="text-5xl text-center font-classic">Watches</h1>
  <div class="grid grid-cols-10 mx-12">
    <div
      class="col-start-2 col-end-9 md:col-start-4 md:col-end-8 w-full mx-auto
      flex justify-between px-4 py-2 items-center border border-solid
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
    {#if $answersList.length > 0 || $searchedWatches.length > 0}
      <button
        on:click={removeFilters}
        class="cursor-pointer bg-transparent p-0 col-start-10 min-w-min
        col-end-11 px-4 py-2 border border-solid border-neutral-200 rounded-md
        flex items-center font-text group">
        <p class="m-0 group-hover:text-emerald-700 text-xsm">Remove filter</p>
        <X class="text-neutral-600 group-hover:text-emerald-700" />
      </button>
    {/if}
  </div>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16
    m-20 font-text">
    {#if $watchesFilter != undefined && $watchesFilter.length > 0}
      {#if $searchedWatches.length != 0}
        {#each $searchedWatches as watch, index}
          <div
            class="flex flex-col h-full border-2 border-solid border-neutral-200
            bg-neutral-200 p-2 rounded-md drop-shadow-md">
            <div
              class="aspect-square flex overflow-hidden justify-center
              rounded-md">
              {#await promise}
                <div
                  class="h-full w-full bg-neutral-300 animate-pulse rounded-md" />
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
              {#await promise}
                <div
                  class="h-full w-full bg-neutral-300 animate-pulse rounded-md" />
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
            {#await promise}
              <div
                class="h-full w-full bg-neutral-300 animate-pulse rounded-md" />
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
            {#await promise}
              <div
                class="h-full w-full bg-neutral-300 animate-pulse rounded-md" />
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
