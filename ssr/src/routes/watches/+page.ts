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

const getValue = async (mods: any[]): Promise<Array<any>> => {
  return new Promise(async (resolve, reject) => {
    const modDefault = []
    for (let m of mods) {
      while (m.default === undefined) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
      if (m.default != undefined) {
        modDefault.push(m.default)
      }
    }
    if (modDefault.length > 0) {
      resolve(modDefault)
    }
  })
}

const getMods = async (): Promise<Array<any>> => {
  return new Promise(async (resolve, reject) => {
    const modules = await import.meta.glob('$lib/images/watches/*.webp')
    const modList: any[] = []
    for (let watch of watches) {
      for (const path in modules) {
        modules[path]().then((mod: any) => {
          if (
            path.includes(watch.type.replaceAll(' ', '-').toLocaleUpperCase())
          ) {
            // TODO: refactor that watchHistory images are in a different folder
            if (path.includes('head')) {
              modList.push(mod)
            }
          }

          if (modList.length === watches.length) {
            resolve(modList)
          }
        })
      }
    }
  })
}

export async function load() {
  if (!browser) {
    const modList: any = await getMods()
    const res = await getValue(modList)
    return {
      watches: res,
    }
  } else {
    const modList: any = await getMods()
    const res = await getValue(modList)
    const filters = await filterWatches()
    if (filters.length > 0) {
      return {
        watches: res,
        watchesFilter: filters,
      }
    }
  }
}
