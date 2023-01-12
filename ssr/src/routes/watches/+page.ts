import watches from '$lib/data/watches.json'
import type Watch from '$lib/interfaces/watch.interface'
import { answersList } from '$lib/stores'
import { browser } from '$app/environment'

const filterWatches = async (): Promise<Array<Watch>> => {
  return new Promise((resolve, reject) => {
    answersList.subscribe((data) => {
      if (data != null) {
        const watchesFound = []
        let answersStorage: string[] = []
        if (data.length > 0) {
          answersStorage = data
        } else {
          answersStorage = []
        }
        for (let watch of watches) {
          const categories = watch.categories
          const answers = new Set(answersStorage)
          const res = categories.filter((ans) => answers.has(ans)).length
          if (res == Array.from(answers).length) {
            watchesFound.push(watch)
          }
        }
        resolve(watchesFound)
        answersList.subscribe((data) => {
          if (browser) {
            return localStorage.setItem('answers', JSON.stringify(data))
          }
        })
      } else {
        resolve([])
      }
    })
  })
}

export async function load() {
  try {
    const res = await filterWatches()
    if (res.length > 0) {
      return {
        watches: res,
      }
    }
  } catch (error) {
    console.log('error ', error)
  }
}

export const prerender = true
