<script lang="ts">
  import AppHolder from '../../components/holders/AppHolder.svelte'

  export let name
</script>

<AppHolder>
  <section class="flex justify-between m-20 gap-16">
    <!-- <div class="aspect-video w-1/2 bg-neutral-200 rounded-md" /> -->
    <div class="aspect-video w-1/2 rounded-md overflow-hidden flex justify-center">
      <img src="/rolex-head.webp" alt="" class="max-h-full rounded-md" />
    </div>
    <div class="flex flex-col font-text w-1/2">
      <h1 class="capitalize text-3xl my-0 mb-4">{name}</h1>
      <h2 class="text-xl mt-0">1905, London, United Kingdom</h2>
      <p class="leading-6">
        Rolex is a British-founded Swiss watch designer and manufacturer based
        in Geneva, Switzerland. Founded in 1905 as Wilsdorf and Davis by Hans
        Wilsdorf and Alfred Davis in London, the company registered Rolex as the
        brand name of its watches in 1908 and became Rolex Watch Co. Ltd. in
        1915. After World War I, the company moved its base of operations to
        Geneva because of the unfavorable economy in the United Kingdom. In
        1920, Hans Wilsdorf registered Montres Rolex SA in Geneva as the new
        company name (montre is French for wristwatch); it later became Rolex
        SA. Since 1960, the company has been owned by the Hans Wilsdorf
        Foundation, a private family trust.
      </p>
    </div>
  </section>
  <h3 class="text-center font-text text-3xl">1905-1919</h3>
  <section class="grid grid-cols-10 m-20 mt-10 gap-16 font-text">
    <div
      class="aspect-video col-start-1 col-end-5 rounded-md flex justify-center">
      <img src="/rolex-1.jpg" alt="" class="max-h-full rounded-md" />
    </div>
    <div class="col-start-5 col-end-11 self-center">
      <h3 class="text-2xl">1905, Hans Wilsdorf</h3>
      <p class="leading-8">
        The history of Rolex is inextricably linked to the visionary spirit of
        Hans Wilsdorf, its founder. In 1905, at the age of 24, Hans Wilsdorf
        founded a company in London specialising in the distribution of
        timepieces. He began to dream of a watch worn on the wrist. Wristwatches
        were not very precise at the time, but Hans Wilsdorf foresaw that they
        could become not only elegant, but also reliable.
      </p>
      <p class="leading-8">
        To convince the public of the reliability of his resolutely innovative
        timepieces, he equipped them with small, very precise movements
        manufactured by a Swiss watchmaking company in Bienne.
      </p>
    </div>
    <div class="col-start-1 col-end-7 self-center">
      <h3 class="text-2xl">1908, Genuis in five letters</h3>
      <p class="leading-8">
        Hans Wilsdorf wanted his watches to bear a name that was short, easy to
        say and remember in any language, and which looked good on watch
        movements and dials.
      </p>
      <p class="leading-8">
        He said, “I tried combining the letters of the alphabet in every
        possible way. This gave me some hundred names, but none of them felt
        quite right. One morning, while riding on the upper deck of a
        horse-drawn omnibus along Cheapside in the City of London, a genie
        whispered ‘Rolex’ in my ear.”
      </p>
    </div>
    <div
      class="aspect-video col-start-7 col-end-11 rounded-md flex justify-center">
      <img src="/rolex-2.webp" alt="" class="max-h-full rounded-md" />
    </div>
    <div
      class="aspect-video col-start-1 col-end-5 rounded-md flex justify-center">
      <img src="/rolex-3.webp" alt="" class="max-h-full rounded-md" />
    </div>
    <div class="col-start-5 col-end-11 self-center">
      <h3 class="text-2xl">1910, The quest for chronometric precision</h3>
      <p class="leading-8">
        Rolex first concentrated on the quality of the movements. The relentless
        quest for chronometric precision rapidly led to success. In 1910, a
        Rolex watch was the first wristwatch in the world to receive the Swiss
        Certificate of Chronometric Precision, granted by the Official Watch
        Rating Centre in Bienne.
      </p>
    </div>
    <div class="col-start-1 col-end-7 self-center">
      <h3 class="text-2xl">1914, The quest for chronometric precision</h3>
      <p class="leading-8">
        Four years later, in 1914, Kew Observatory in Great Britain awarded a
        Rolex wristwatch a class "A" precision certificate, a distinction which
        until that point in time had been reserved exclusively for marine
        chronometers. From that date forward, the Rolex wristwatch was
        synonymous with precision.
      </p>
    </div>
    <div
      class="aspect-video col-start-7 col-end-11 rounded-md flex justify-center">
      <img src="/rolex-4.webp" alt="" class="max-h-full rounded-md" />
    </div>
    <div
      class="aspect-video col-start-1 col-end-5 rounded-md flex justify-center">
      <img src="/rolex-5.webp" alt="" class="max-h-full rounded-md" />
    </div>
    <div class="col-start-5 col-end-11 self-center">
      <h3 class="text-2xl">1919, Geneva</h3>
      <p class="leading-8">
        Rolex moved to Geneva, a city renowned internationally for watchmaking.
        Montres Rolex S.A. was registered in Geneva in 1920.
      </p>
    </div>
  </section>
</AppHolder>
