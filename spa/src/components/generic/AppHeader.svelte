<script lang="ts">
  import { Link, navigate } from 'svelte-routing'
  import {
    Search,
    AlignLeft,
    Home,
    Watch,
    Building2,
    PackageSearch,
    X,
  } from 'lucide-svelte'
  import { writable } from 'svelte/store'

  const showMenu = writable<boolean>(false)

  const menu = () => {
    $showMenu = !$showMenu
    if ($showMenu == true) {
      const scrollTop = window.pageYOffset
      const scrollLeft = window.pageXOffset
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop)
      }
    } else {
      window.onscroll = function () {}
    }
  }
</script>

<header
  class="grid grid-cols-10 lg:grid-cols-3 px-4 sm:px-12 py-4 items-center
  bg-zinc-100 m-0 text-zinc-600 font-text">
  <button
    on:click={menu}
    class="xl:hidden border-none bg-transparent min-w-min p-0 w-8 h-8 flex">
    <AlignLeft class="sm:w-8 sm:h-8" />
    <p class="text-transparent h-0 w-0">Menu</p>
  </button>
  <nav class="hidden xl:flex gap-12 2xl:gap-16">
    <Link
      to="/"
      class="no-underline text-zinc-600 self-center hover:text-emerald-700
      focus:text-emerald-700 hover:underline focus:underline outline-none">
      Home
    </Link>
    <Link
      to="/brands"
      class="no-underline text-zinc-600 self-center hover:text-emerald-700
      focus:text-emerald-700 hover:underline focus:underline outline-none">
      Brands
    </Link>
    <Link
      to="/watches"
      class="no-underline text-zinc-600 self-center hover:text-emerald-700
      focus:text-emerald-700 hover:underline focus:underline outline-none">
      Watches
    </Link>
    <Link
      to="/matcher"
      class="no-underline text-zinc-600 self-center hover:text-emerald-700
      focus:text-emerald-700 hover:underline focus:underline outline-none">
      Matcher
    </Link>
  </nav>
  <Link
    to="/"
    class="col-start-4 col-end-8 text-center lg:col-start-2 lg:col-end-3
    no-underline my-4 uppercase tracking-widest text-xl sm:text-3xl text-center
    text-zinc-800 font-classic">
    Watchmatcher
  </Link>
  <div class="hidden w-1/2 justify-self-end lg:flex justify-between" />
</header>
<section
  class={`z-10 w-1/2 sm:w-1/3 h-screen bg-zinc-100 ${$showMenu == false ? 'hidden' : 'absolute'}`}>
  <nav class="flex flex-col gap-8 sm:text-xl font-text">
    <div class="flex justify-between items-center px-12 pt-8 pb-4">
      <h2 class="font-text font-semibold my-0">Menu</h2>
      <button
        on:click={menu}
        class="xl:hidden border-none bg-transparent min-w-min w-8 h-8 z-10 self
        end">
        <X class="sm:w-8 sm:h-8" />
      </button>
    </div>
    <Link
      to="/"
      class="hover:text-emerald-700 hover:no-underline
      focus-within:text-emerald-700 active:text-emerald-700
      focus-visible:text-emerald-700 mr-auto ml-4 sm:ml-12 flex items-center
      gap-4 no-underline text-zinc-600 self-center hover:text-emerald-700
      focus:text-emerald-700 hover:underline focus:underline outline-none">
      <Home />
      <p>Home</p>
    </Link>
    <Link
      to="/brands"
      class="hover:text-emerald-700 hover:no-underline
      focus-within:text-emerald-700 active:text-emerald-700
      focus-visible:text-emerald-700 mr-auto ml-4 sm:ml-12 flex items-center
      gap-4 no-underline text-zinc-600 self-center hover:text-emerald-700
      focus:text-emerald-700 hover:underline focus:underline outline-none">
      <Building2 />
      <p>Brands</p>
    </Link>
    <Link
      to="/watches"
      class="hover:text-emerald-700 hover:no-underline
      focus-within:text-emerald-700 active:text-emerald-700
      focus-visible:text-emerald-700 mr-auto ml-4 sm:ml-12 flex items-center
      gap-4 no-underline text-zinc-600 self-center hover:text-emerald-700
      focus:text-emerald-700 hover:underline focus:underline outline-none">
      <Watch />
      <p>Watches</p>
    </Link>
    <Link
      to="/matcher"
      class="hover:text-emerald-700 hover:no-underline
      focus-within:text-emerald-700 active:text-emerald-700
      focus-visible:text-emerald-700 mr-auto ml-4 sm:ml-12 flex items-center
      gap-4 no-underline text-zinc-600 self-center hover:text-emerald-700
      focus:text-emerald-700 hover:underline focus:underline outline-none">
      <PackageSearch />
      <p>Matcher</p>
    </Link>
  </nav>
</section>
