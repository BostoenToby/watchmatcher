<script lang="ts">
  import sites from '$lib/data/sites.json'
  let count = -1
  for(let site of sites){
    count += 1
  }
</script>

<footer
  class="bg-zinc-100 m-0 py-8 sm:px-12 font-text overflow-x-hidden mt-auto">
  <div class="flex flex-col sm:flex-row h-full gap-12">
    <h1 class="font-classic hidden xl:block text-6xl p-12">Watchmatcher</h1>
    <div
      class="flex flex-col min-w-min items-start pl-4 sm:pl-0 border-0 xl:pl-12 border-l-2 xl:border-solid">
      <div class="flex flex-col gap-4">
        <h2>Top watches</h2>
        <a
          href="/brands/rolex"
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          >Rolex</a>
        <a
          href="/brands/tissot"
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          >Tissot</a>
        <a
          href="/brands/audemars-piguet"
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          >Audemars Piguet</a>
        <a
          href="/brands/hublot"
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          >Hublot</a>
      </div>
    </div>
    <div class="flex-auto" />
    <div class="flex flex-col items-start pl-4 sm:pl-0">
      <div class="flex flex-col gap-4">
        <h2>Contact</h2>
        <a
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          href="mailto:toby.bostoen@student.howest.be"
          >toby.bostoen@student.howest.be</a>
        <a
          class="no-underline text-black hover:text-emerald-700 hover:underline"
          href="tel:+32493580592">+32 493 58 05 92</a>
      </div>
    </div>
  </div>
  <ul class="mt-12 w-full grid grid-cols-3 md:grid-cols-5 gap-y-2 lg:flex items-center justify-center list-none lg:gap-4 text-xs text-neutral-500">
    {#each sites as site, index}
      {#if index != count}
      <li><a href={site.url} class="no-underline text-neutral-600">{site.name}, </a></li>
      {:else}
      <li><a href={site.url} class="no-underline text-neutral-600">{site.name}</a></li>
      {/if}
    {/each}
    <li class="col-span-2 text-neutral-600">is a protected trademark used under educational copyright</li>
  </ul>
</footer>
