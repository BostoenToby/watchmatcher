<script lang="ts">
  import { writable } from 'svelte/store'

  import AppHolder from '../../components/holders/AppHolder.svelte'
  import brands from '../../assets/brands.json'
  import type Brand from '../../interfaces/brand.interface'

  export let name

  let brand = writable<Brand>()

  for (let b of brands) {
    if (b.name.replace(' ', '-').toLocaleLowerCase() == name) {
      brand.set(b)
    }
  }
</script>

<AppHolder>
  <section class="flex justify-between m-20 gap-16">
    <div
      class="aspect-video w-1/2 rounded-md overflow-hidden flex justify-center">
      <img
        src="/{$brand.name.replace(' ', '-').toLocaleLowerCase()}-head.webp"
        alt=""
        class="max-h-full rounded-md" />
    </div>
    <div class="flex flex-col font-text w-1/2">
      <h1 class="capitalize text-3xl my-0 mb-4">{$brand.name}</h1>
      <h2 class="text-xl mt-0">
        {$brand.foundingDate}, {$brand.city}, {$brand.country}
      </h2>
      <p class="leading-6">
        {$brand.history.head}
      </p>
    </div>
  </section>
  {#each $brand.history.information as information}
    <h3 class="text-center font-text text-3xl">{information.title}</h3>
    <section class="grid grid-cols-10 m-20 mt-10 gap-16 font-text">
      {#each information.informationblocks as informationblock, index}
        {#if index % 2 == 0}
          <div
            class={`aspect-video ${
              index % 2 == 0
                ? 'col-start-1 col-end-5'
                : 'col-start-7 col-end-11'
            } rounded-md flex justify-center`}>
            <img
              src="/{$brand.name.replace(' ', '-').toLocaleLowerCase()}-{index +
                1}.webp"
              alt=""
              class="rounded-md" />
          </div>
          <div
            class={`${
              index % 2 == 0
                ? 'col-start-5 col-end-11'
                : 'col-start-1 col-end-7'
            } self-center`}>
            <h3 class="text-2xl">{informationblock.subtitle}</h3>
            <p class="leading-8">{informationblock.information}</p>
          </div>
        {:else}
          <div
            class={`${
              index % 2 == 0
                ? 'col-start-5 col-end-11'
                : 'col-start-1 col-end-7'
            } self-center`}>
            <h3 class="text-2xl">{informationblock.subtitle}</h3>
            <p class="leading-8">{informationblock.information}</p>
          </div>
          <div
            class={`aspect-video ${
              index % 2 == 0
                ? 'col-start-1 col-end-5'
                : 'col-start-7 col-end-11'
            } rounded-md flex justify-center`}>
            <img
              src="/{$brand.name.replace(' ', '-').toLocaleLowerCase()}-{index +
                1}.webp"
              alt=""
              class="rounded-md" />
          </div>
        {/if}
      {/each}
    </section>
  {/each}
</AppHolder>
