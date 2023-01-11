import watches from '$lib/data/watches.json'
import type Watch from '$lib/interfaces/watch.interface'

const filterWatches = async (): Promise<Array<Watch>> => {
  return new Promise((resolve, reject) => {
    if (
      localStorage.getItem('answers') != undefined &&
      localStorage.getItem('answers') != null
    ) {
      const watchesFound = []
      const answersStorage = localStorage
        .getItem('answers')
        ?.replace('[', '')
        .replace(']', '')
        .replaceAll('"', '')
        .split(',')
      for (let watch of watches) {
        const categories = watch.categories
        const answers = new Set(answersStorage)
        const res = categories.filter((ans) => answers.has(ans)).length
        if (res == Array.from(answers).length) {
          watchesFound.push(watch)
        }
      }
      resolve(watchesFound)
    } else {
      resolve([])
    }
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
