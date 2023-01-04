<script lang="ts">
  import AppHolder from '../../components/holders/AppHolder.svelte'

  export let name
</script>

<AppHolder>
  <section class="flex justify-between m-20 gap-16">
    <!-- <div class="aspect-video w-1/2 bg-neutral-200 rounded-md" /> -->
    <div
      class="aspect-video w-1/2 rounded-md overflow-hidden flex justify-center">
      <img
        src="/watches/vacheron-constantin-FIFTYSIX-TOURBILLON.webp"
        alt=""
        class="max-h-full rounded-md" />
    </div>
    <div class="flex flex-col font-text w-1/2">
      <h1 class="capitalize text-3xl my-0 mb-4">FIFTYSIX-TOURBILLON</h1>
      <h2 class="text-xl mt-0">
        Vacheron Contstantin, 1755, Genève, Switzerland
      </h2>
      <p class="leading-6">
        A tribute to a model from 1956, this 18K pink gold watch is the first
        tourbillon from the Fiftysix collection. The Maltese cross – a Vacheron
        Constantin icon – is found on the tourbillon cage, the crown, and more
        subtly, on the horns. Its movement, fitted with a power reserve of more
        than 3 days, is equipped with a 22K gold peripheral mass revealing the
        entire movement through the openworked caseback.
      </p>
    </div>
  </section>
  <h3 class="text-center font-text text-3xl">Watch specifications</h3>
  <section class="flex justify-between mx-20 font-text">
    <div>
      <h4 class="text-2xl mb-0 pb-4">Case</h4>
      <div class="py-1">
        <p>MATERIAL</p>
        <p>pink gold</p>
      </div>
      <div class="py-1">
        <p>SIZE (MM)</p>
        <p>41</p>
      </div>
      <div class="py-1">
        <p>THICKNESS (MM)</p>
        <p>10,94</p>
      </div>
      <div class="py-1">
        <p>WATER-RESISTANCE (BAR)</p>
        <p>3</p>
      </div>
      <div class="py-1">
        <p>CASE BACK</p>
        <p>Transparent caseback, sapphire glass</p>
      </div>
    </div>
    <div>
      <h4 class="text-2xl mb-0 pb-4">Bracelet</h4>
      <div class="py-1">
        <p>NUMBER OF BRACELETS</p>
        <p>1</p>
      </div>
      <div class="py-1">
        <p>MATERIAL OF THE BRACELETS</p>
        <p>Mississippiensis alligator (dark brown)</p>
      </div>
      <div class="py-1">
        <p>SIZE</p>
        <p>20/18</p>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div>
        <h4 class="text-2xl mb-0 pb-4">Buckle</h4>
        <div class="py-1">
          <p>NUMBER OF BRACELETS</p>
          <p>1</p>
        </div>
        <div class="py-1">
          <p>MATERIAL OF THE BRACELETS</p>
          <p>Mississippiensis alligator (dark brown)</p>
        </div>
        <div class="py-1">
          <p>SIZE</p>
          <p>20/18</p>
        </div>
      </div>
      <div>
        <h4 class="text-2xl mb-0 pb-4">Dial</h4>
        <div class="py-1">
          <p>MATERIAL</p>
          <p>metal</p>
        </div>
      </div>
      <div>
        <h4 class="text-2xl mb-0 pb-4">Watch</h4>
        <div class="py-1">
          <p>WEIGHT</p>
          <p>100 grams</p>
        </div>
        <div class="py-1">
          <p>ORIGIN</p>
          <p>Swiss made</p>
        </div>
      </div>
    </div>
  </section>
  <h3 class="text-center font-text text-3xl">Watch history</h3>
  <section class="grid grid-cols-10 m-20 mt-10 gap-16 font-text">
    <div
      class="aspect-video col-start-1 col-end-5 rounded-md flex justify-center">
      <img src="/watches/vacheron-constantin-FIFTYSIX-TOURBILLON-1.webp" alt="" />
    </div>
    <div class="col-start-5 col-end-11 self-center">
      <h3 class="text-2xl">At the origin of the Tourbillon</h3>
      <p class="leading-8">
        Patented in 1801, the tourbillon was developed to combat the harmful
        effects of earth’s gravity on the escapements of pocket watches held in
        a vertical position. While the arrival of wristwatches makes the
        tourbillon's role less clear, its creation requires greater expertise.
        Whatever the position of the watch, it is vital to achieve absolute
        precision in the rotating escapement.
      </p>
    </div>
    <div class="col-start-1 col-end-7 self-center">
      <h3 class="text-2xl">Design</h3>
      <p class="leading-8">
        Featuring a cage in the shape of the Maltese cross, the tourbillon
        performs one full rotation per minute. Both a technical and aesthetic
        feat, the tourbillon also fulfills its practical function of indicating
        the seconds.
      </p>
    </div>
    <div
      class="aspect-video col-start-7 col-end-11 rounded-md flex justify-center">
      <img src="/watches/vacheron-constantin-FIFTYSIX-TOURBILLON-2.webp" alt="" />
    </div>
    <div
      class="aspect-video col-start-1 col-end-5 rounded-md flex justify-center">
      <img src="/watches/vacheron-constantin-FIFTYSIX-TOURBILLON-3.webp" alt="" />
    </div>
    <div class="col-start-5 col-end-11 self-center">
      <h3 class="text-2xl">About the collection</h3>
      <p class="leading-8">
        A name and a date evoking an iconic model by Vacheron Constantin dating
        from 1956. This modern, elegant and relaxed collection with its
        resolutely cosmopolitan style expresses its personality through the
        contrast between the classic dial and the daring case. The latter is
        notably inspired by the Maltese cross-shaped emblem of the Maison that
        is also picked up on the openworked pink gold oscillating weight.
      </p>
    </div>
  </section>
</AppHolder>
