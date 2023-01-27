import brands from '$lib/data/brands.json'

const getValue = async (mods: any[]): Promise<any> => {
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

const getMods = async () => {
  return new Promise(async (resolve, reject) => {
    const modules = await import.meta.glob('$lib/images/brands/*.webp')
    const modList: any[] = []
    for (let brand of brands) {
      for (const path in modules) {
        modules[path]().then((mod: any) => {
          if (
            path.includes(brand.name.replaceAll(' ', '-').toLocaleLowerCase())
          ) {
            modList.push(mod)
          }
          if (modList.length === brands.length) {
            resolve(modList)
          }
        })
      }
    }
  })
}

export async function load() {
  const modList: any = await getMods()
  const res = await getValue(modList)
  return {
    images: res,
  }
}
