<script lang="ts">
  import { writable } from 'svelte/store'
  import { page } from '$app/stores'

  import watches from '$lib/data/watches.json'
  import type Watch from '$lib/interfaces/watch.interface'

  const watch = writable<Watch>()
  const headImage = writable<any>()
  const images = writable<Array<any>>()

  const getValue = async (mods: any[]): Promise<any[]> => {
    return new Promise(async (resolve, reject) => {
      const modDefault = []
      let modDefaultHead
      while (mods.length == 0) {
        await new Promise((resolve) => setTimeout(resolve, 100))
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
      if ($watch.history != null && modDefault.length > 0) {
        resolve(modDefault)
      } else if ($watch.history == null) {
        resolve(modDefault)
      }
    })
  }

  const getMods = (watch: Watch) => {
    return new Promise(async (resolve, reject) => {
      const modules = await import.meta.glob('$lib/images/watches/*.webp')
      const modList: any[] = []
      for (const path in modules) {
        modules[path]().then(async (mod: any) => {
          if (path.includes(watch.type.replaceAll(' ', '-').toUpperCase())) {
            await modList.push(mod)
          }
        })
      }
      resolve(modList)
    })
  }

  const getImages = async () => {
    let watchFound: Watch | undefined
    for (let w of watches) {
      if (
        w.type.replaceAll('-', ' ').toLocaleLowerCase() ==
        $page.params.slug.replaceAll('-', ' ').toLocaleLowerCase()
      ) {
        watchFound = w
        watch.set(w)
      }
    }
    if (typeof watchFound == 'undefined') {
      return
    }
    const modList: any = await getMods(watchFound)
    const res = await getValue(modList)
    images.set(res)
    return res
  }

  let promise = getImages()
</script>

<svelte:head>
  <title>Watch</title>
  <meta name="description" content="Specific information about a watch" />
  <link rel="canonical" href="https://watchmatcherssg.tobybostoen.be/watches/{$page.params.slug}" />
</svelte:head>

<main>
  <section
    class="flex flex-col-reverse md:flex-row justify-between mx-5 md:mx-12 lg:mx-20 py-12 gap-16">
    <div
      class="aspect-square md:aspect-video w-full md:w-1/2 rounded-md
      overflow-hidden flex justify-center">
      {#await promise}
        <div class="w-full h-full rounded-md bg-neutral-200 animate-pulse" />
      {:then}
        <img
          src={$headImage}
          alt="The {$watch.brand}
          {$watch.type} watch."
          class="max-h-full rounded-md" />
      {/await}
    </div>
    <div class="flex flex-col font-text md:w-1/2">
      <div class="flex flex-col-reverse">
        <h2 class="text-xl my-0">{$watch.brand}, {$watch.watch}</h2>
        <h1 class="capitalize text-3xl my-0 mb-4">{$watch.type}</h1>
      </div>
      <p class="leading-6">{$watch.information}</p>
    </div>
  </section>
  <h2 class="text-center font-text text-3xl">Watch specifications</h2>
  <section
    class="grid md:grid-cols-3 gap-8 mx-20 font-text text-center md:text-left">
    <div>
      <h3 class="text-2xl mb-0 pb-4">Case</h3>
      <div class="py-1">
        <p class="font-medium">MATERIAL</p>
        <p>{$watch.specifications.case.material}</p>
      </div>
      <div class="py-1">
        <p class="font-medium">SIZE (MM)</p>
        <p>{$watch.specifications.case.size}</p>
      </div>
      <div class="py-1">
        <p class="font-medium">THICKNESS (MM)</p>
        <p>{$watch.specifications.case.thickness}</p>
      </div>
      <div class="py-1">
        {#if $watch.specifications.case.waterResistanceM != null}
          <p class="font-medium">WATER-RESISTANCE (METER)</p>
          <p>{$watch.specifications.case.waterResistanceM}</p>
        {:else}
          <p class="font-medium">WATER-RESISTANCE (BAR)</p>
          <p>{$watch.specifications.case.waterResistanceB}</p>
        {/if}
      </div>
    </div>
    <div>
      <h3 class="text-2xl mb-0 pb-4">Bracelet</h3>
      <div class="py-1">
        <p class="font-medium">NUMBER OF BRACELETS</p>
        <p>{$watch.specifications.bracelet.number}</p>
      </div>
      <div class="py-1">
        <p class="font-medium">MATERIAL OF THE BRACELETS</p>
        <p>{$watch.specifications.bracelet.material}</p>
      </div>
      {#if $watch.specifications.bracelet.size != null}
        <div class="py-1">
          <p class="font-medium">SIZE</p>
          <p>{$watch.specifications.bracelet.size}</p>
        </div>
      {/if}
    </div>
    <div class="flex flex-col gap-4">
      {#if $watch.specifications.buckle.type != null && $watch.specifications.buckle.material != null}
        <div>
          <h3 class="text-2xl mb-0 pb-4">Buckle</h3>
          {#if $watch.specifications.buckle.type != null}
            <div class="py-1">
              <p class="font-medium">TYPE</p>
              <p>{$watch.specifications.buckle.type}</p>
            </div>
          {/if}
          {#if $watch.specifications.buckle.material != null}
            <div class="py-1">
              <p class="font-medium">MATERIAL</p>
              <p>{$watch.specifications.buckle.material}</p>
            </div>
          {/if}
        </div>
      {/if}
      <div>
        <h3 class="text-2xl mb-0 pb-4">Dial</h3>
        <div class="py-1">
          <p class="font-medium">MATERIAL</p>
          <p>{$watch.specifications.dial.material}</p>
        </div>
      </div>
      <div>
        <h3 class="text-2xl mb-0 pb-4">Watch</h3>
        {#if $watch.specifications.watch.weight != null}
          <div class="py-1">
            <p class="font-medium">WEIGHT (GRAMS)</p>
            <p>{$watch.specifications.watch.weight}</p>
          </div>
        {/if}
        <div class="py-1">
          <p class="font-medium">ORIGIN</p>
          <p>{$watch.specifications.watch.origin}</p>
        </div>
      </div>
    </div>
  </section>
  <h3 class="text-center font-text text-3xl">Calibre</h3>
  <section
    class="grid md:grid-cols-3 gap-8 mx-20 font-text text-center md:text-left">
    <div class="flex flex-col md:col-start-1 md:col-end-2 overflow-x-hidden">
      <div class="py-1">
        <p class="font-medium">NAME</p>
        <p>{$watch.calibre.name}</p>
      </div>
      <div class="py-1">
        <p class="font-medium">FUNCTIONS</p>
        <div class="grid grid-cols-2 gap-x-16 text-center">
          {#each $watch.calibre.functions as f, index}
            {#if index + 1 == $watch.calibre.functions.length}
              <p>{f}</p>
            {:else}
              <p>{f},</p>
            {/if}
          {/each}
        </div>
      </div>
      <div class="py-1">
        <p class="font-medium">PARTS</p>
        <p>{$watch.calibre.parts}</p>
      </div>
      <div class="py-1">
        <p class="font-medium">FREQUENCY</p>
        <p>
          {$watch.calibre.frequencyHZ} Hz - {$watch.calibre.frequencyVPH} VPH
        </p>
      </div>
      <div class="py-1">
        <p class="font-medium">THICKNESS (MM)</p>
        <p>{$watch.calibre.thickness}</p>
      </div>
    </div>
    <div class="flex flex-col md:col-start-3 md:col-end-4">
      <div class="py-1">
        <p class="font-medium">JEWELS</p>
        <p>{$watch.calibre.jewels}</p>
      </div>
      <div class="py-1">
        <p class="font-medium">MECHANISM</p>
        <p>{$watch.calibre.mechanism}</p>
      </div>
      <div class="py-1">
        <p class="font-medium">POWER RESERVE</p>
        <p>{$watch.calibre.powerReserve}</p>
      </div>
      <div class="py-1">
        <p class="font-medium">TOTAL DIAMETER</p>
        <p>{$watch.calibre.totalDiameter}</p>
      </div>
    </div>
  </section>
  {#if $watch.history != null}
    <h3 class="text-center font-text text-3xl">Watch history</h3>
    <section class="w-4/5 mx-auto overflow-x-hidden mb-20">
      {#each $watch.history as h, index}
        {#if index % 2 == 0}
          <section
            class="flex flex-col-reverse lg:grid lg:grid-cols-10 mt-10 gap-16
            font-text overflow-x-hidden">
            <div
              class={`self-center aspect-auto ${index % 2 == 0 ? 'col-start-1 col-end-5' : 'col-start-7 col-end-11'} rounded-md flex justify-center`}>
              {#await promise}
                <div
                  class="rounded-md w-full md:w-1/2 lg:w-full h-full
                  bg-neutral-200 animate-pulse" />
              {:then images}
                {#if images != undefined}
                  <img
                    src={images[index]}
                    alt={h.altImage}
                    width="100%"
                    height="100%"
                    class="rounded-md w-full md:w-1/2 lg:w-full" />
                {/if}
              {/await}
            </div>
            <div
              class={`${index % 2 == 0 ? 'col-start-5 col-end-11' : 'col-start-1 col-end-7'} lg:self-center`}>
              <h3 class="text-2xl">{h.subtitle}</h3>
              <p class="leading-8">{h.text}</p>
            </div>
          </section>
        {:else}
          <section
            class="flex flex-col lg:grid lg:grid-cols-10 mt-10 gap-16 font-text
            overflow-x-hidden">
            <div
              class={`${index % 2 == 0 ? 'col-start-5 col-end-11' : 'col-start-1 col-end-7'} lg:self-center`}>
              <h3 class="text-2xl">{h.subtitle}</h3>
              <p class="leading-8">{h.text}</p>
            </div>
            <div
              class={`self-center aspect-auto ${index % 2 == 0 ? 'col-start-1 col-end-5' : 'col-start-7 col-end-11'} rounded-md flex justify-center`}>
              {#await promise}
                <div
                  class="rounded-md w-full md:w-1/2 lg:w-full h-full
                  bg-neutral-200 animate-pulse" />
              {:then images}
                {#if images != undefined}
                  <img
                    src={images[index]}
                    alt={h.altImage}
                    class="rounded-md w-full md:w-1/2 lg:w-full" />
                {/if}
              {/await}
            </div>
          </section>
        {/if}
      {/each}
    </section>
  {/if}
</main>
