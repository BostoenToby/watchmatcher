<script lang="ts">
  import { writable } from 'svelte/store'
  import { navigate } from 'svelte-routing'

  import AppHolder from '../components/holders/AppHolder.svelte'
  import type { Answer } from '../interfaces/questions.interface'
  import questions from '../assets/questions.json'
  import { answersList } from '../stores'

  let answers = writable<Array<Answer>>([])

  function onChange(event) {
    const answerFound = event.currentTarget.value
    if (Object.keys($answers).length != 0) {
      for (let object of $answers) {
        const objList = $answers
        if (
          object.question == event.currentTarget.name &&
          object.multipleAnswers == false
        ) {
          objList.splice(objList.indexOf(object), 1)
          object.answer = [answerFound]
          objList.push(object)
          answers.set(objList)
          return
        } else if (
          object.question == event.currentTarget.name &&
          object.multipleAnswers == true
        ) {
          if (object.answer.includes(answerFound)) {
            objList.splice(objList.indexOf(object, 1))
            if (typeof object.answer != 'string') {
              object.answer.splice(object.answer.indexOf(answerFound), 1)
            }
            objList.push(object)
            answers.set(objList)
            return
          }
          objList.splice(objList.indexOf(object), 1)
          if (typeof object.answer == 'string') {
            object.answer = [object.answer, answerFound]
          } else {
            object.answer.push(answerFound)
          }
          objList.push(object)
          answers.set(objList)
          return
        }
      }
      answers.set([
        ...$answers,
        {
          question: event.currentTarget.name,
          answer: event.currentTarget.value,
          multipleAnswers: questions.find(
            (item) => item.question == event.currentTarget.name,
          ).multipleAnswers,
        },
      ])
    } else {
      answers.set([
        {
          question: event.currentTarget.name,
          answer: event.currentTarget.value,
          multipleAnswers: questions.find(
            (item) => item.question == event.currentTarget.name,
          ).multipleAnswers,
        },
      ])
    }
  }

  const findWatch = () => {
    let ansList = []
    for (let answer of $answers) {
      if (typeof answer.answer != 'string') {
        for (let item of answer.answer) {
          ansList.push(item)
        }
      } else {
        ansList.push(answer.answer)
      }
    }
    ansList = Array.from(new Set(ansList))
    $answersList = ansList
    navigate('/watches', { state: { answers: ansList } })
  }
</script>

<svelte:head>
  <title>Matcher</title>
  <meta
    name="description"
    content="The matcher to find the watch that suites you" />
    <link rel="canonical" href="https://watchmatcherssr.tobybostoen.be/matcher" />
</svelte:head>

<AppHolder>
  <h1 class="text-5xl text-center font-classic">Matcher</h1>
  <h2 class="text-2xl text-center font-text w-3/4 mx-auto">
    Answer the following questions so we can show you what watches suite you.
  </h2>
  <section class="m-20 font-text">
    {#each questions as question, index}
      <div class={`${index <= $answers.length ? null : 'hidden'}`}>
        <h3 class="text-lg text-center">
          {question.question}
        </h3>
        <div
          class="w-3/4 grid md:grid-cols-2 md:grid-rows-2 gap-x-12 gap-y-4 mx-auto mt-4">
          {#each question.answers as answer}
            {#if question.multipleAnswers == true}
              <label
                for="{question.question}-{answer}"
                class={`w-full border border-solid border-neutral-200 py-4 md:p-4 rounded-md cursor-pointer flex items-center justify-center text-center ${
                  $answers
                    .find((item) => item.question === question.question)
                    ?.answer.includes(answer)
                    ? 'bg-emerald-700 text-white'
                    : null
                }`}>
                <input
                  type="checkbox"
                  id="{question.question}-{answer}"
                  name={question.question}
                  value={answer}
                  on:change={onChange}
                  class="appearance-none" />
                {answer}
              </label>
            {:else}
              <label
                for="{question.question}-{answer}"
                class={`w-full border border-solid border-neutral-200 py-4 md:p-4 rounded-md cursor-pointer flex items-center justify-center ${
                  answer ==
                  $answers.find((item) => item.question === question.question)
                    ?.answer
                    ? 'bg-emerald-700 text-white'
                    : null
                }`}>
                <input
                  type="radio"
                  id="{question.question}-{answer}"
                  name={question.question}
                  value={answer}
                  on:change={onChange}
                  class="appearance-none" />
                {answer}
              </label>
            {/if}
          {/each}
        </div>
      </div>
    {/each}
    <div class="w-full flex justify-center mt-12">
      <button
        on:click={findWatch}
        class="px-4 py-2 border-none rounded-md bg-emerald-700 text-white font-text text-xl"
        >Find a watch</button>
    </div>
  </section>
</AppHolder>
