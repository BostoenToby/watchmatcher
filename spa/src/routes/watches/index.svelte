<script lang="ts">
  import { Link } from 'svelte-routing'
  import { writable } from 'svelte/store'

  import AppHolder from '../../components/holders/AppHolder.svelte'
  import watches from '../../assets/watches.json'
  import type Watch from '../../interfaces/watch.interface'
  import { Search } from 'lucide-svelte'

  const watchesFilter = writable<Array<Watch>>([])
  const searchInput = writable<string>()
  const searchedWatches = writable<Array<Watch>>([])

  for (let watch of watches) {
    if (history.state != null) {
      if ('answers' in history.state) {
        const categories = watch.categories
        const answers = new Set(history.state.answers)
        const res = categories.filter((ans) => answers.has(ans)).length
        if (res == history.state.answers.length) {
          $watchesFilter.push(watch)
        }
      }
    }
  }

  const filterWatches = () => {
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
  }
</script>

<svelte:head>
  <title>Watches</title>
  <meta name="description" content="Collection of all the watches" />
</svelte:head>

<AppHolder>
  <h1 class="text-5xl text-center font-classic">Watches</h1>
  <div class="grid grid-cols-10 mx-12">
    <div
      class="col-start-2 col-end-9 md:col-start-4 md:col-end-8 w-full mx-auto flex justify-between px-4 py-2 items-center border border-solid border-neutral-200 rounded-md">
      <input
        bind:value={$searchInput}
        on:change={filterWatches}
        type="text"
        placeholder="Search for a brand"
        class="rounded-md outline-none border-none w-full font-text text-xl" />
      <button
        on:click={filterWatches}
        class="border-none bg-transparent cursor-pointer group flex"
        ><Search class="relative right-0 group-hover:text-emerald-700" />
        <p class="w-0 h-0 text-transparent">Search</p></button>
    </div>
  </div>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 m-20 font-text">
    {#if (history.state != undefined || history.state != null) && 'answers' in history.state}
      {#if $searchedWatches.length != 0}
        {#each $searchedWatches as watch}
          <div
            class="flex flex-col h-full border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
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
                alt=""
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
                  class="no-underline outline-none bg-emerald-700 text-white rounded-md px-4 py-2"
                  >View</Link>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        {#each $watchesFilter as watch}
          <div
            class="flex flex-col h-full border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
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
                alt=""
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
                  class="no-underline outline-none bg-emerald-700 text-white rounded-md px-4 py-2"
                  >View</Link>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    {:else if $searchedWatches.length != 0}
      {#each $searchedWatches as watch}
        <div
          class="flex flex-col h-full border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
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
              alt=""
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
                class="no-underline outline-none bg-emerald-700 text-white rounded-md px-4 py-2"
                >View</Link>
            </div>
          </div>
        </div>
      {/each}
    {:else}
      {#each watches as watch}
        <div
          class="flex flex-col h-full border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
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
              alt=""
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
                class="no-underline outline-none bg-emerald-700 text-white rounded-md px-4 py-2"
                >View</Link>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </section>
</AppHolder>
