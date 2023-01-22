<script lang="ts">
  import { writable } from 'svelte/store'
  import { page } from '$app/stores'

  import brands from '$lib/data/brands.json'
  import type Brand from '$lib/interfaces/brand.interface'

  let brand = writable<Brand>()
  let headImage = writable<any>()
  let images = writable<Array<Array<any>>>()

  const getValue = async (mods: any[]): Promise<any[]> => {
    return new Promise(async (resolve, reject) => {
      const modDefault = []
      let modDefaultHead
      while (mods.length == 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
      for (let m of mods) {
        while (m.default === undefined) {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
        if (m.default != undefined) {
          if (m.default.includes('head')) {
            modDefaultHead = m.default
            headImage.set(modDefaultHead)
          } else {
            modDefault.push(m.default)
          }
        }
      }
      if (modDefault.length > 0) {
        resolve(modDefault)
      }
    })
  }

  const getMods = async (brand: Brand) => {
    return new Promise(async (resolve, reject) => {
      const modules = await import.meta.glob('$lib/images/brandsHistory/*.webp')
      let count = 0
      for (const path in modules) {
        modules[path]().then((mod: any) => {
          if (path.includes(brand.name.replace(' ', '-').toLowerCase())) {
            count += 1
          }
        })
      }
      const modList: any[] = []
      for (const path in modules) {
        modules[path]().then((mod: any) => {
          if (path.includes(brand.name.replace(' ', '-').toLowerCase())) {
            modList.push(mod)
          }
          if (count == modList.length) {
            resolve(modList)
          }
        })
      }
    })
  }

  const getImages = async () => {
    let brandFound: Brand | undefined
    for (let b of brands) {
      if (b.name.replace(' ', '-').toLocaleLowerCase() == $page.params.slug) {
        brandFound = b
        brand.set(b)
      }
    }
    if (typeof brandFound == 'undefined') {
      return
    }
    const modList: any = await getMods(brandFound)
    const res = await getValue(modList)
    images.set(res)
    return res
  }
  let promise = getImages()
</script>

<svelte:head>
  <title>Brand</title>
  <meta name="description" content="Specific information about a brand" />
</svelte:head>

{#if $brand != undefined && $brand.history != undefined}
  <main>
    <section
      class="flex flex-col-reverse lg:flex-row justify-between m-20 gap-16">
      <div
        class="aspect-video w-full lg:w-1/2 rounded-md overflow-hidden flex
        justify-center">
        {#await promise}
          <div
            class="max-h-full rounded-md bg-neutral-200 animate-pulse w-full" />
        {:then}
          <img
            src={$headImage}
            alt={$brand.history.altImage}
            class="max-h-full rounded-md" />
        {/await}
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
                class={`h-full self-center aspect-auto ${index % 2 != 0 ? 'lg:col-start-1 lg:col-end-5' : 'lg:col-start-7 lg:col-end-11'} rounded-md flex justify-center`}>
                {#await promise}
                  <div
                    class="rounded-md md:w-1/2 lg:w-full h-full bg-neutral-200
                    animate-pulse" />
                {:then images}
                  {#if images != undefined}
                    <img
                      src={images.find((image) =>
                        image.includes(`-${indexH + 1}-${index + 1}`),
                      )}
                      alt={informationblock.altImage}
                      class="rounded-md w-full md:w-1/2 lg:w-full" />
                  {/if}
                {/await}
              </div>
              <div
                class={`${index % 2 != 0 ? 'lg:col-start-5 lg:col-end-11' : 'lg:col-start-1 lg:col-end-5'} lg:self-center`}>
                <h3 class="text-2xl">{informationblock.subtitle}</h3>
                <p class="leading-8">{informationblock.information}</p>
              </div>
            </section>
          {:else}
            <section
              class="flex flex-col lg:grid lg:grid-cols-10 mt-10 gap-16
              font-text overflow-x-hidden">
              <div
                class={`${index % 2 != 0 ? 'lg:col-start-5 lg:col-end-11' : 'lg:col-start-1 lg:col-end-5'} lg:self-center`}>
                <h3 class="text-2xl">{informationblock.subtitle}</h3>
                <p class="leading-8">{informationblock.information}</p>
              </div>
              <div
                class={`h-full self-center aspect-auto ${index % 2 != 0 ? 'lg:col-start-1 lg:col-end-5' : 'lg:col-start-7 lg:col-end-11'} rounded-md flex justify-center`}>
                {#await promise}
                  <div
                    class="rounded-md md:w-1/2 lg:w-full h-full bg-neutral-200
                    animate-pulse" />
                {:then images}
                  {#if images != undefined}
                    <img
                      src={images.find((image) =>
                        image.includes(`-${indexH + 1}-${index + 1}`),
                      )}
                      alt={informationblock.altImage}
                      class="rounded-md w-full md:w-1/2 lg:w-full" />
                  {/if}
                {/await}
              </div>
            </section>
          {/if}
        {/each}
      {/each}
    </section>
  </main>
{/if}
