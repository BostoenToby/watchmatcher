<script lang="ts">
  import { Link, navigate } from 'svelte-routing'
  import { Search } from 'lucide-svelte'
  import { writable } from 'svelte/store'

  const searchTerm = writable<string>()

  const search = () => {
    console.log("searching on ", $searchTerm)
    navigate(`/watches/${$searchTerm}`)
  }
</script>

<header
  class="grid grid-cols-3 px-12 py-4 items-center bg-zinc-100 m-0 text-zinc-600 font-text">
  <nav class="flex gap-16">
    <Link to="/" class="no-underline text-zinc-600 self-center hover:text-emerald-700 focus:text-emerald-700 hover:underline focus:underline outline-none">Home</Link>
    <Link to="/brands" class="no-underline text-zinc-600 self-center hover:text-emerald-700 focus:text-emerald-700 hover:underline focus:underline outline-none">Brands</Link>
    <Link to="/watches" class="no-underline text-zinc-600 self-center hover:text-emerald-700 focus:text-emerald-700 hover:underline focus:underline outline-none">Watches</Link>
    <Link to="/matcher" class="no-underline text-zinc-600 self-center hover:text-emerald-700 focus:text-emerald-700 hover:underline focus:underline outline-none">Matcher</Link>
  </nav>
  <h1 class="uppercase tracking-widest text-3xl text-center text-zinc-800 font-classic">
    Watchmatcher
  </h1>
  <div class="w-1/2 justify-self-end flex justify-between">
    <input
      type="text"
      bind:value={$searchTerm}
      placeholder="Search by brand or model"
      class="w-full border-none outline-none bg-transparent text-zinc-600" />
    <button on:click={search} class="text-zinc-600 outline-none border-none hover:text-emerald-700 focus:text-emerald-700"><Search /></button>
  </div>
</header>
