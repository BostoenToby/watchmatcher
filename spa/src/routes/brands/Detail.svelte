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

<svelte:head>
  <title>Brand</title>
  <meta name="description" content="Specific information about a brand" />
  <link
    rel="canonical"
    href="https://watchmatcherssr.tobybostoen.be/brands/{$brand.name}" />
</svelte:head>

<AppHolder>
  <section
    class="flex flex-col-reverse lg:flex-row justify-between mx-5 md:mx-12
    lg:mx-20 py-12 gap-16">
    <div
      class="aspect-video w-full lg:w-1/2 rounded-md overflow-hidden flex
      justify-center">
      <img
        src="/brandsHistory/{$brand.name
          .replace(' ', '-')
          .toLocaleLowerCase()}-head.webp"
        alt={$brand.history.altImage}
        class="max-h-full rounded-md" />
    </div>
    <div class="flex flex-col font-text lg:w-1/2">
      <h1 class="capitalize text-3xl my-0 mb-4">{$brand.name}</h1>
      <h2 class="text-xl mt-0">
        {$brand.foundingDate}, {$brand.city}, {$brand.country}
      </h2>
      <p class="leading-6">{$brand.history.head}</p>
    </div>
  </section>
  <section class="w-4/5 mx-auto overflow-x-hidden mb-20">
    {#each $brand.history.information as information, indexH}
      <h3 class="text-center font-text text-3xl">{information.title}</h3>
      {#each information.informationblocks as informationblock, index}
        {#if index % 2 != 0}
          <section
            class="flex flex-col-reverse lg:grid lg:grid-cols-10 mt-10 gap-16
            font-text overflow-x-hidden">
            <div
              class={`self-center aspect-auto ${index % 2 != 0 ? 'lg:col-start-1 lg:col-end-5' : 'lg:col-start-7 lg:col-end-11'} rounded-md flex justify-center`}>
              <img
                src="/brandsHistory/{$brand.name
                  .replace(' ', '-')
                  .toLocaleLowerCase()}-{indexH + 1}-{index + 1}.webp"
                alt={informationblock.altImage}
                class="rounded-md w-full md:w-1/2 lg:w-full" />
            </div>
            <div
              class={`${index % 2 != 0 ? 'lg:col-start-5 lg:col-end-11' : 'lg:col-start-1 lg:col-end-5'} lg:self-center`}>
              <h3 class="text-2xl">{informationblock.subtitle}</h3>
              <p class="leading-8">{informationblock.information}</p>
            </div>
          </section>
        {:else}
          <section
            class="flex flex-col lg:grid lg:grid-cols-10 mt-10 gap-16 font-text
            overflow-x-hidden">
            <div
              class={`${index % 2 != 0 ? 'lg:col-start-5 lg:col-end-11' : 'lg:col-start-1 lg:col-end-5'} lg:self-center`}>
              <h3 class="text-2xl">{informationblock.subtitle}</h3>
              <p class="leading-8">{informationblock.information}</p>
            </div>
            <div
              class={`self-center aspect-auto ${index % 2 != 0 ? 'lg:col-start-1 lg:col-end-5' : 'lg:col-start-7 lg:col-end-11'} rounded-md flex justify-center`}>
              <img
                src="/brandsHistory/{$brand.name
                  .replace(' ', '-')
                  .toLocaleLowerCase()}-{indexH + 1}-{index + 1}.webp"
                alt={informationblock.altImage}
                class="rounded-md w-full md:w-1/2 lg:w-full" />
            </div>
          </section>
        {/if}
      {/each}
    {/each}
  </section>
</AppHolder>
