<script lang="ts">
  import { Link } from 'svelte-routing'
  import AppHolder from '../components/holders/AppHolder.svelte'
</script>

<AppHolder>
  <!-- <div class="h-80 w-120 bg-neutral-200 rounded-md mx-auto mt-20" /> -->
  <div class="flex items-center"><img src="/watchmatcher.jpg" alt="" class="w-120 mt-40 mx-auto mb-4"></div>
  <h1 class="text-center font-classic text-5xl mt-8">Watchmatcher</h1>
  <h1 class="text-center font-classic text-2xl mt-8">
    The place to find the perfect watch for you
  </h1>
  <div class="w-full flex justify-center w-1/2 mt-20">
    <div class="flex items-center font-text gap-8">
      <p class="text-lg">Find a watch that suites you with this test</p>
      <Link
        to="/matcher"
        class="no-underline text-white bg-emerald-700 rounded-md px-4 py-2 rounded-md"
        >Matcher</Link>
    </div>
  </div>
  <section class="m-20 mb-40 flex justify-between gap-8 font-text">
    <img src="/brand.jpg" alt="" class="w-2/5 rounded-md" />
    <div class="w-1/2 flex flex-col justify-between">
      <h2 class="mt-0">Brands</h2>
      <div>
        <p class="leading-8">
          We provide information about all the brands you can possibly think of.
          From premium brands like Rolex, Audemars Piguet, Patek Philippe to the
          more affordable watches like Festina, Casio, Fossil, ...
        </p>
        <p class="leading-8">
          The brand information includes the history of the brand, the models
          they produce and the price range of their watches.
        </p>
        <p class="leading-8">
          Do you want to learn more about your favourite watch brand? Click on
          the button to choose get a selection of brands.
        </p>
      </div>
      <Link
        to="/brands"
        class="no-underline text-white bg-emerald-700 px-4 py-2 rounded-md w-min"
        >Brands</Link>
    </div>
  </section>
  <section class="m-20 mb-40 flex justify-between font-text">
    <div class="w-1/2 flex flex-col justify-between">
      <h2 class="mt-0">Watches</h2>
      <div>
        <p class="leading-8">
          Do you want to know more about a certain watch you like? We provide
          specific information about the watches you like. From the technical
          specifications to the history of the watch.
        </p>
        <p class="leading-8">
          From the very exclusive top tier watches to the more affordable
          watches, we provide information about all the watches you can think
          of.
        </p>
        <p class="leading-8">
          Do you want to know more about a certain watch? Click the button to
          get a selection of watches.
        </p>
      </div>
      <Link
        to="/watches"
        class="no-underline text-white bg-emerald-700 px-4 py-2 rounded-md w-min"
        >Watches</Link>
    </div>
    <img src="/watch.jpg" alt="" class="w-2/5 rounded-md" />
  </section>
  <section class="m-20 mb-40 flex justify-between font-text">
    <img src="/matcher.jpg" alt="" class="w-2/5 rounded-md" />
    <div class="w-1/2 flex flex-col justify-between">
      <h2 class="mt-0">Watch matcher</h2>
      <div>
        <p class="leading-8">
          Are you having trouble deciding what watch to buy? We provide a test
          where you can see what watch suits you best. The test is based on your
          preferences and the type of watch you are looking for.
        </p>
        <p class="leading-8">
          The test will give you a list of watches that suits you best. These
          watches can be filtered on price, popularity and brand.
        </p>
        <p class="leading-8">Click the button to start the test.</p>
      </div>
      <Link
        to="/matcher"
        class="no-underline text-white bg-emerald-700 px-4 py-2 rounded-md w-min"
        >Matcher</Link>
    </div>
  </section>
</AppHolder>
