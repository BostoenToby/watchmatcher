import { writable } from 'svelte/store'

export const answersList = writable<Array<string>>([])

const answers = localStorage.getItem('answers')
if (answers != null && answers != '{}') {
  answersList.set(JSON.parse(answers))
} else {
  localStorage.setItem('answers', JSON.stringify(null))
}
