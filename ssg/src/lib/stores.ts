import { writable } from 'svelte/store'
import { browser } from '$app/environment'

export const answersList = writable<Array<string>>([])

if (browser) {
  const answers = localStorage.getItem('answers')
  if (answers != null && answers != '{}') {
    answersList.set(JSON.parse(answers))
  } else {
    localStorage.setItem('answers', JSON.stringify(null))
  }
}
