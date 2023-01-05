<script lang="ts">
  import { Link } from 'svelte-routing'

  import AppHolder from '../../components/holders/AppHolder.svelte'
  import brands from '../../assets/brands.json'
</script>

<AppHolder>
  <h1 class="text-5xl text-center font-classic">Brands</h1>
  <section class="grid grid-cols-4 gap-16 m-20 font-text">
    {#each brands as brand}
      <div
        class="border-2 border-solid border-neutral-200 bg-neutral-200 p-2 rounded-md drop-shadow-md">
        <div
          class="aspect-square flex overflow-hidden justify-center rounded-md">
          <img
            src="/brands/{brand.name
              .replace(' ', '-')
              .toLocaleLowerCase()}.webp"
            alt=""
            class="max-h-full" />
        </div>
        <div class="flex justify-between">
          <div>
            <p class="text-neutral-600 mb-2">
              {brand.foundingDate}, {brand.country}
            </p>
            <h3 class="mt-0">{brand.name}</h3>
          </div>
          <Link
            to="/brands/{brand.name.replace(' ', '-').toLocaleLowerCase()}"
            class="no-underline outline-none self-center bg-emerald-700 text-white rounded-md px-4 py-2"
            >View</Link>
        </div>
      </div>
    {/each}
  </section>
</AppHolder>
