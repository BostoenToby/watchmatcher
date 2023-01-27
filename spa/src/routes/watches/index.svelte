<script lang="ts">
  import { Link } from 'svelte-routing'
  import { writable } from 'svelte/store'
  import { Search, X } from 'lucide-svelte'

  import AppHolder from '../../components/holders/AppHolder.svelte'
  import watches from '../../assets/watches.json'
  import type Watch from '../../interfaces/watch.interface'
  import { answersList } from '../../stores'

  const watchesFilter = writable<Array<Watch>>([])
  const searchInput = writable<string>()
  const searchedWatches = writable<Array<Watch>>([])

  for (let watch of watches) {
    console.log($answersList)
    if ($answersList != undefined && $answersList != null) {
      try {
        if ($answersList.length > 0) {
          const categories = watch.categories
          const answers = new Set($answersList)
          try {
            const res = categories.filter((ans) => answers.has(ans)).length
            if (res == $answersList.length) {
              $watchesFilter.push(watch)
            }
          } catch (e) {
            console.log('Problem here 2')
          }
        }
      } catch (error) {
        console.log('problem here 3')
      }
    }
  }

  const filterWatches = () => {
    try {
      if ($watchesFilter.length != 0) {
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
    } catch (error) {
      console.log('There was a mistake made here')
    }
  }

  const removeFilters = () => {
    $watchesFilter = []
    $answersList = []
    $searchedWatches = []
    $searchInput = ''
  }
</script>

<svelte:head>
  <title>Watches</title>
  <meta name="description" content="Collection of all the watches" />
  <link rel="canonical" href="https://watchmatcherssr.tobybostoen.be/watches" />
</svelte:head>

<AppHolder>
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
  </div>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16
    m-20 font-text">
    {#if $answersList.length > 0}
      {#if $searchedWatches.length != 0}
        {#each $searchedWatches as watch}
          <div
            class="flex flex-col h-full border-2 border-solid border-neutral-200
            bg-neutral-200 p-2 rounded-md drop-shadow-md">
            <div
              class="aspect-square flex overflow-hidden justify-center
              rounded-md">
              <img
                src="/watches/{watch.brand
                  .replaceAll(' ', '-')
                  .toLocaleLowerCase()}-{watch.watch
                  .replaceAll(' ', '-')
                  .replaceAll('.', ',')
                  .toLocaleUpperCase()}-{watch.type
                  .replaceAll(' ', '-')
                  .toLocaleUpperCase()}.webp"
                alt="The {watch.brand}"
                class="max-h-full" />
            </div>
            <div class="flex flex-col flex-auto">
              <div class="text-center">
                <p class="text-neutral-600 mb-2">
                  {watch.brand} - {watch.watch}
                </p>
                <h2 class="mt-0 text-lg">{watch.type}</h2>
              </div>
              <div class="self-center flex items-end flex-1">
                <Link
                  to="/watches/{watch.type
                    .replaceAll(' ', '-')
                    .toLocaleLowerCase()}"
                  class="no-underline outline-none bg-emerald-700 text-white
                  rounded-md px-4 py-2">
                  View
                </Link>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        {#each $watchesFilter as watch}
          <div
            class="flex flex-col h-full border-2 border-solid border-neutral-200
            bg-neutral-200 p-2 rounded-md drop-shadow-md">
            <div
              class="aspect-square flex overflow-hidden justify-center
              rounded-md">
              <img
                src="/watches/{watch.brand
                  .replaceAll(' ', '-')
                  .toLocaleLowerCase()}-{watch.watch
                  .replaceAll(' ', '-')
                  .replaceAll('.', ',')
                  .toLocaleUpperCase()}-{watch.type
                  .replaceAll(' ', '-')
                  .toLocaleUpperCase()}.webp"
                alt="The {watch.brand}"
                class="max-h-full" />
            </div>
            <div class="flex flex-col flex-auto">
              <div class="text-center">
                <p class="text-neutral-600 mb-2">
                  {watch.brand} - {watch.watch}
                </p>
                <h2 class="mt-0 text-lg">{watch.type}</h2>
              </div>
              <div class="self-center flex items-end flex-1">
                <Link
                  to="/watches/{watch.type
                    .replaceAll(' ', '-')
                    .toLocaleLowerCase()}"
                  class="no-underline outline-none bg-emerald-700 text-white
                  rounded-md px-4 py-2">
                  View
                </Link>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    {:else if $searchedWatches.length != 0}
      {#each $searchedWatches as watch}
        <div
          class="flex flex-col h-full border-2 border-solid border-neutral-200
          bg-neutral-200 p-2 rounded-md drop-shadow-md">
          <div
            class="aspect-square flex overflow-hidden justify-center rounded-md">
            <img
              src="/watches/{watch.brand
                .replaceAll(' ', '-')
                .toLocaleLowerCase()}-{watch.watch
                .replaceAll(' ', '-')
                .replaceAll('.', ',')
                .toLocaleUpperCase()}-{watch.type
                .replaceAll(' ', '-')
                .toLocaleUpperCase()}.webp"
              alt="The {watch.brand}"
              class="max-h-full" />
          </div>
          <div class="flex flex-col flex-auto">
            <div class="text-center">
              <p class="text-neutral-600 mb-2">{watch.brand} - {watch.watch}</p>
              <h2 class="mt-0 text-lg">{watch.type}</h2>
            </div>
            <div class="self-center flex items-end flex-1">
              <Link
                to="/watches/{watch.type
                  .replaceAll(' ', '-')
                  .toLocaleLowerCase()}"
                class="no-underline outline-none bg-emerald-700 text-white
                rounded-md px-4 py-2">
                View
              </Link>
            </div>
          </div>
        </div>
      {/each}
    {:else}
      {#each watches as watch}
        <div
          class="flex flex-col h-full border-2 border-solid border-neutral-200
          bg-neutral-200 p-2 rounded-md drop-shadow-md">
          <div
            class="aspect-square flex overflow-hidden justify-center rounded-md">
            <img
              src="/watches/{watch.brand
                .replaceAll(' ', '-')
                .toLocaleLowerCase()}-{watch.watch
                .replaceAll(' ', '-')
                .replaceAll('.', ',')
                .toLocaleUpperCase()}-{watch.type
                .replaceAll(' ', '-')
                .toLocaleUpperCase()}.webp"
              alt="The {watch.brand}"
              class="max-h-full" />
          </div>
          <div class="flex flex-col flex-auto">
            <div class="text-center">
              <p class="text-neutral-600 mb-2">{watch.brand} - {watch.watch}</p>
              <h2 class="mt-0 text-lg">{watch.type}</h2>
            </div>
            <div class="self-center flex items-end flex-1">
              <Link
                to="/watches/{watch.type
                  .replaceAll(' ', '-')
                  .toLocaleLowerCase()}"
                class="no-underline outline-none bg-emerald-700 text-white
                rounded-md px-4 py-2">
                View
              </Link>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </section>
</AppHolder>
