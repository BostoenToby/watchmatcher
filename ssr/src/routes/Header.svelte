<script lang="ts">
  import {
    AlignLeft,
    Search,
    Home,
    Watch,
    Building2,
    PackageSearch,
    X,
  } from 'lucide-svelte'
  import { writable } from 'svelte/store'

  const searchTerm = writable<string>()
  const showMenu = writable<boolean>(false)

  const search = () => {
    console.log('search')
  }

  const menu = () => {
    $showMenu = !$showMenu
  }
</script>

<header
  class="grid grid-cols-10 lg:grid-cols-3 px-4 sm:px-12 py-4 items-center bg-zinc-100 m-0 text-zinc-600 font-text">
  <button
    on:click={menu}
    class="xl:hidden border-none bg-transparent min-w-min p-0 w-8 h-8 z-10"
    ><AlignLeft class="sm:w-8 sm:h-8" />
  </button>
  <nav class="hidden xl:flex gap-16">
    <a
      href="/"
      class="no-underline text-zinc-600 self-center hover:text-emerald-700 focus:text-emerald-700 hover:underline focus:underline outline-none"
      >Home</a>
    <a
      href="/brands"
      class="no-underline text-zinc-600 self-center hover:text-emerald-700 focus:text-emerald-700 hover:underline focus:underline outline-none"
      >Brands</a>
    <a
      href="/watches"
      class="no-underline text-zinc-600 self-center hover:text-emerald-700 focus:text-emerald-700 hover:underline focus:underline outline-none"
      >Watches</a>
    <a
      href="/matcher"
      class="no-underline text-zinc-600 self-center hover:text-emerald-700 focus:text-emerald-700 hover:underline focus:underline outline-none"
      >Matcher</a>
  </nav>
  <a
    href="/"
    class="col-start-4 col-end-8 text-center lg:col-start-2 lg:col-end-3 no-underline my-4 uppercase tracking-widest text-xl sm:text-3xl text-center text-zinc-800 font-classic"
    >Watchmatcher</a>
  <div class="hidden w-1/2 justify-self-end lg:flex justify-between">
    <input
      type="text"
      bind:value={$searchTerm}
      placeholder="Search by brand or model"
      class="w-full border-none outline-none bg-transparent text-zinc-600" />
    <button
      on:click={search}
      class="text-zinc-600 outline-none border-none hover:text-emerald-700 focus:text-emerald-700">
      <Search />
    </button>
  </div>
</header>
<section
  class={`z-10 w-1/2 sm:w-1/3 h-screen bg-zinc-100 ${
    $showMenu == false ? 'hidden' : 'absolute'
  }`}>
  <nav class="flex flex-col gap-8 sm:text-xl font-text">
    <div class="flex justify-between items-center px-12 pt-8 pb-4">
      <h2 class="font-text font-semibold my-0">Menu</h2>
      <button
        on:click={menu}
        class="xl:hidden border-none bg-transparent min-w-min w-8 h-8 z-10 self end"
        ><X class="sm:w-8 sm:h-8" />
      </button>
    </div>
    <a
      href="/"
      class="hover:text-emerald-700 hover:no-underline focus-within:text-emerald-700 active:text-emerald-700 focus-visible:text-emerald-700 mr-auto ml-4 sm:ml-12 flex items-center gap-4 no-underline text-zinc-600 self-center hover:text-emerald-700 focus:text-emerald-700 hover:underline focus:underline outline-none">
      <Home />
      <p>Home</p>
    </a>
    <a
      href="/brands"
      class="hover:text-emerald-700 hover:no-underline focus-within:text-emerald-700 active:text-emerald-700 focus-visible:text-emerald-700 mr-auto ml-4 sm:ml-12 flex items-center gap-4 no-underline text-zinc-600 self-center hover:text-emerald-700 focus:text-emerald-700 hover:underline focus:underline outline-none">
      <Building2 />
      <p>Brands</p>
    </a>
    <a
      href="/watches"
      class="hover:text-emerald-700 hover:no-underline focus-within:text-emerald-700 active:text-emerald-700 focus-visible:text-emerald-700 mr-auto ml-4 sm:ml-12 flex items-center gap-4 no-underline text-zinc-600 self-center hover:text-emerald-700 focus:text-emerald-700 hover:underline focus:underline outline-none">
      <Watch />
      <p>Watches</p>
    </a>
    <a
      href="/matcher"
      class="hover:text-emerald-700 hover:no-underline focus-within:text-emerald-700 active:text-emerald-700 focus-visible:text-emerald-700 mr-auto ml-4 sm:ml-12 flex items-center gap-4 no-underline text-zinc-600 self-center hover:text-emerald-700 focus:text-emerald-700 hover:underline focus:underline outline-none">
      <PackageSearch />
      <p>Matcher</p>
    </a>
  </nav>
</section>
