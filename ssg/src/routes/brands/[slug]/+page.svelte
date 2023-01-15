<script lang="ts">
  import { writable } from 'svelte/store'
  import { page } from '$app/stores'

  import brands from '$lib/data/brands.json'
  import type Brand from '$lib/interfaces/brand.interface'

  let brand = writable<Brand>()
  let headImage = writable<any>()
  let images = writable<Array<Array<any>>>()

  const getImages = async () => {
    let brandFound
    for (let b of brands) {
      if (b.name.replace(' ', '-').toLocaleLowerCase() == $page.params.slug) {
        brandFound = b
        brand.set(b)
      }
    }
    const imagesList = []
    let countInfo = 0
    const head = await import(
      /* @vite-ignore */ `/src/lib/images/brandsHistory/${$brand.name
        .replace(' ', '-')
        .toLocaleLowerCase()}-head.webp`
    )
    headImage.set(head.default)
    for (let info of $brand.history!.information) {
      countInfo += 1
      const imagesInfo = []
      let countInfoblock = 0
      for (let infoBlock of info.informationblocks) {
        countInfoblock += 1
        const image = await import(
          /* @vite-ignore */ `/src/lib/images/brandsHistory/${$brand.name
            .replace(' ', '-')
            .toLocaleLowerCase()}-${countInfo}-${countInfoblock}.webp`
        )
        imagesInfo.push(image.default)
      }
      imagesList.push(imagesInfo)
    }
    images.set(imagesList)
    if ($images.length != 0) {
      return $images
    }
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
        class="aspect-video w-full lg:w-1/2 rounded-md overflow-hidden flex justify-center">
        <img src={$headImage} alt="" class="max-h-full rounded-md" />
      </div>
      <div class="flex flex-col font-text lg:w-1/2">
        <h1 class="capitalize text-3xl my-0 mb-4">{$brand.name}</h1>
        <h2 class="text-xl mt-0">
          {$brand.foundingDate}, {$brand.city}, {$brand.country}
        </h2>
        <p class="leading-6">
          {$brand.history.head}
        </p>
      </div>
    </section>
    <section class="w-4/5 mx-auto overflow-x-hidden mb-20">
      {#each $brand.history.information as information, indexH}
        <h3 class="text-center font-text text-3xl">{information.title}</h3>
        {#each information.informationblocks as informationblock, index}
          {#if index % 2 != 0}
            <section
              class="flex flex-col-reverse lg:grid lg:grid-cols-10 mt-10 gap-16 font-text overflow-x-hidden">
              <div
                class={`self-center aspect-auto ${
                  index % 2 != 0
                    ? 'lg:col-start-1 lg:col-end-5'
                    : 'lg:col-start-7 lg:col-end-11'
                } rounded-md flex justify-center`}>
                {#await promise}
                  <p>Loading...</p>
                {:then images}
                  {#if images != undefined}
                    <img
                      src={images[indexH].find(
                        (image) =>
                          image ==
                          `/src/lib/images/brandsHistory/${$brand.name
                            .replace(' ', '-')
                            .toLowerCase()}-${indexH + 1}-${index + 1}.webp`,
                      )}
                      alt=""
                      class="rounded-md w-full md:w-1/2 lg:w-full" />
                  {/if}
                {/await}
              </div>
              <div
                class={`${
                  index % 2 != 0
                    ? 'lg:col-start-5 lg:col-end-11'
                    : 'lg:col-start-1 lg:col-end-5'
                } lg:self-center`}>
                <h3 class="text-2xl">{informationblock.subtitle}</h3>
                <p class="leading-8">{informationblock.information}</p>
              </div>
            </section>
          {:else}
            <section
              class="flex flex-col lg:grid lg:grid-cols-10 mt-10 gap-16 font-text overflow-x-hidden">
              <div
                class={`${
                  index % 2 != 0
                    ? 'lg:col-start-5 lg:col-end-11'
                    : 'lg:col-start-1 lg:col-end-5'
                } lg:self-center`}>
                <h3 class="text-2xl">{informationblock.subtitle}</h3>
                <p class="leading-8">{informationblock.information}</p>
              </div>
              <div
                class={`self-center aspect-auto ${
                  index % 2 != 0
                    ? 'lg:col-start-1 lg:col-end-5'
                    : 'lg:col-start-7 lg:col-end-11'
                } rounded-md flex justify-center`}>
                {#await promise}
                  <p>Loading...</p>
                {:then images}
                  {#if images != undefined}
                    <img
                      src={images[indexH].find(
                        (image) =>
                          image ==
                          `/src/lib/images/brandsHistory/${$brand.name
                            .replace(' ', '-')
                            .toLowerCase()}-${indexH + 1}-${index + 1}.webp`,
                      )}
                      alt=""
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
