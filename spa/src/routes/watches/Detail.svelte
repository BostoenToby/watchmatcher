<script lang="ts">
  import { writable } from 'svelte/store'

  import AppHolder from '../../components/holders/AppHolder.svelte'
  import watches from '../../assets/watches.json'
  import type Watch from '../../interfaces/watch.interface'

  export let name

  const watch = writable<Watch>()

  for (let w of watches) {
    if (
      w.type.replaceAll('-', ' ').toLocaleLowerCase() ==
      name.replaceAll('-', ' ').toLocaleLowerCase()
    ) {
      watch.set(w)
    }
  }
</script>

<AppHolder>
  <section
    class="flex flex-col-reverse md:flex-row justify-between m-12 md:m-20 gap-16">
    <div
      class="aspect-square md:aspect-video w-full md:w-1/2 rounded-md overflow-hidden flex justify-center">
      <img
        src="/watches/{$watch.brand
          .replaceAll(' ', '-')
          .toLocaleLowerCase()}-{$watch.watch
          .replaceAll(' ', '-')
          .replaceAll('.', ',')
          .toLocaleUpperCase()}-{$watch.type
          .replaceAll(' ', '-')
          .toLocaleUpperCase()}.webp"
        alt=""
        class="max-h-full rounded-md" />
    </div>
    <div class="flex flex-col font-text md:w-1/2">
      <h2 class="text-xl my-0">{$watch.brand}, {$watch.watch}</h2>
      <h1 class="capitalize text-3xl my-0 mb-4">{$watch.type}</h1>
      <p class="leading-6">
        {$watch.information}
      </p>
    </div>
  </section>
  <h3 class="text-center font-text text-3xl">Watch specifications</h3>
  <section
    class="grid md:grid-cols-3 gap-8 mx-20 font-text text-center md:text-left">
    <div>
      <h4 class="text-2xl mb-0 pb-4">Case</h4>
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
      <h4 class="text-2xl mb-0 pb-4">Bracelet</h4>
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
          <h4 class="text-2xl mb-0 pb-4">Buckle</h4>
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
        <h4 class="text-2xl mb-0 pb-4">Dial</h4>
        <div class="py-1">
          <p class="font-medium">MATERIAL</p>
          <p>{$watch.specifications.dial.material}</p>
        </div>
      </div>
      <div>
        <h4 class="text-2xl mb-0 pb-4">Watch</h4>
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
            class="flex flex-col-reverse lg:grid lg:grid-cols-10 mt-10 gap-16 font-text overflow-x-hidden">
            <div
              class={`self-center aspect-auto ${
                index % 2 == 0
                  ? 'col-start-1 col-end-5'
                  : 'col-start-7 col-end-11'
              } rounded-md flex justify-center`}>
              <img
                src="/watches/{$watch.brand
                  .replace(' ', '-')
                  .toLocaleLowerCase()}-{$watch.watch
                  .replace(' ', '-')
                  .toLocaleUpperCase()}-{$watch.type
                  .replace(' ', '-')
                  .toLocaleUpperCase()}-{index + 1}.webp"
                alt=""
                class="rounded-md w-full md:w-1/2 lg:w-full aspect-video" />
            </div>
            <div
              class={`${
                index % 2 == 0
                  ? 'col-start-5 col-end-11'
                  : 'col-start-1 col-end-7'
              } lg:elf-center`}>
              <h3 class="text-2xl">{h.subtitle}</h3>
              <p class="leading-8">{h.text}</p>
            </div>
          </section>
        {:else}
          <section
            class="flex flex-col lg:grid lg:grid-cols-10 mt-10 gap-16 font-text overflow-x-hidden">
            <div
              class={`${
                index % 2 == 0
                  ? 'col-start-5 col-end-11'
                  : 'col-start-1 col-end-7'
              } lg:elf-center`}>
              <h3 class="text-2xl">{h.subtitle}</h3>
              <p class="leading-8">{h.text}</p>
            </div>
            <div
              class={`self-center aspect-auto ${
                index % 2 == 0
                  ? 'col-start-1 col-end-5'
                  : 'col-start-7 col-end-11'
              } rounded-md flex justify-center`}>
              <img
                src="/watches/{$watch.brand
                  .replace(' ', '-')
                  .toLocaleLowerCase()}-{$watch.watch
                  .replace(' ', '-')
                  .toLocaleUpperCase()}-{$watch.type
                  .replace(' ', '-')
                  .toLocaleUpperCase()}-{index + 1}.webp"
                alt=""
                class="rounded-md w-full md:w-1/2 lg:w-full aspect-video" />
            </div>
          </section>
        {/if}
      {/each}
    </section>
  {/if}
</AppHolder>
