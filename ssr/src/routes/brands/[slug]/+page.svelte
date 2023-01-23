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
  <link
    rel="canonical"
    href="https://watchmatcherssr.tobybostoen.be/brands/{$page.params.slug}" />
</svelte:head>

{#if $brand != undefined && $brand.history != undefined}
  <main>
    <section
      class="flex flex-col-reverse lg:grid lg:grid-cols-10 justify-between m-20
      gap-16">
      <picture
        class="relative aspect-auto lg:col-start-1 lg:col-end-4 overflow-hidden
        flex flex-wrap justify-center items-center">
        {#await promise}
          <div class="h-full w-full rounded-md bg-neutral-200 animate-pulse" />
        {:then images}
          <img
            src={$headImage}
            alt={$brand.history.altImage}
            width="100%"
            height="100%"
            class="relative h-[90%] object-cover rounded-md" />
        {/await}
      </picture>
      <div class="lg:col-start-5 lg:col-end-11 flex flex-col font-text">
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
              <picture
                class={`relative overflow-hidden self-center aspect-auto ${index % 2 != 0 ? 'lg:col-start-1 lg:col-end-5' : 'lg:col-start-7 lg:col-end-11'} rounded-md flex flex-wrap justify-center`}>
                {#await promise}
                  <div
                    class="h-full w-full md:w-1/2 lg:w-full rounded-md
                    bg-neutral-200 animate-pulse" />
                {:then images}
                  {#if images != undefined}
                    <img
                      src={images.find((image) =>
                        image.includes(`-${indexH + 1}-${index + 1}`),
                      )}
                      alt={informationblock.altImage}
                      width="100%"
                      height="100%"
                      class="relative object-cover rounded-md" />
                  {/if}
                {/await}
              </picture>
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
              <picture
                class={`relative overflow-hidden self-center ${index % 2 != 0 ? 'lg:col-start-1 lg:col-end-5' : 'lg:col-start-7 lg:col-end-11'} rounded-md flex flex-wrap justify-center`}>
                {#await promise}
                  <div
                    class="h-full w-full md:w-1/2 lg:w-full rounded-md
                    bg-neutral-200 animate-pulse" />
                {:then images}
                  {#if images != undefined}
                    <img
                      src={images.find((image) =>
                        image.includes(`-${indexH + 1}-${index + 1}`),
                      )}
                      alt={informationblock.altImage}
                      width="100%"
                      height="100%"
                      class="relative object-cover rounded-md" />
                  {/if}
                {/await}
              </picture>
            </section>
          {/if}
        {/each}
      {/each}
    </section>
  </main>
{/if}
