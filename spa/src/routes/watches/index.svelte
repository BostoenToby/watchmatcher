<script lang="ts">
  import { Link } from 'svelte-routing'
  import { writable } from 'svelte/store'

  import AppHolder from '../../components/holders/AppHolder.svelte'
  import watches from '../../assets/watches.json'
  import type Watch from '../../interfaces/watch.interface'

  const watchesFilter = writable<Array<Watch>>([])

  for (let watch of watches) {
    const categories = watch.categories
    const answers = new Set(history.state.answers)
    const res = categories.filter((ans) => answers.has(ans)).length
    if (res == history.state.answers.length) {
      $watchesFilter.push(watch)
    }
  }
</script>

<AppHolder>
  <h1 class="text-5xl text-center font-classic">Watches</h1>
  <section class="grid grid-cols-4 gap-16 m-20 font-text">
    {#if history.state.answers != undefined || history.state.answers != null}
      {#each $watchesFilter as watch}
        <div
          class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
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
          <div class="flex justify-between">
            <div>
              <p class="text-neutral-600 mb-2">{watch.brand} - {watch.watch}</p>
              <h3 class="mt-0">{watch.type}</h3>
            </div>
            <Link
              to="/watches/{watch.type
                .replaceAll(' ', '-')
                .toLocaleLowerCase()}"
              class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2"
              >View</Link>
          </div>
        </div>
      {/each}
    {:else}
      {#each watches as watch}
        <div
          class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
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
          <div class="flex justify-between">
            <div>
              <p class="text-neutral-600 mb-2">{watch.brand} - {watch.watch}</p>
              <h3 class="mt-0">{watch.type}</h3>
            </div>
            <Link
              to="/watches/{watch.type
                .replaceAll(' ', '-')
                .toLocaleLowerCase()}"
              class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2"
              >View</Link>
          </div>
        </div>
      {/each}
    {/if}
  </section>
</AppHolder>
