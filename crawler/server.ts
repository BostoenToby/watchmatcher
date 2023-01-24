import express from 'express'
import querySite from './crawler'
import brands from './data/brands.json'
import watches from './data/watches.json'

const app = express()

const sites = ['spa', 'ssr', 'ssg']
const pages = ['', 'brands', 'watches', 'matcher']

app.use(express.static('crawl'))

const crawl = async() => {
  for (let site of sites) {
    for (let page of pages) {
      await querySite(site, page)
      if (page == 'brands') {
        for (let brand of brands) {
          await querySite(site, `brands-${brand.name.replaceAll(' ','-').toLowerCase()}`)
        }
      } else if (page == 'watches') {
        for (let watch of watches) {
          await querySite(site, `watches-${watch.type.replaceAll(' ','-').toLowerCase()}`)
        }
      }
    }
  }
}

crawl()

app.listen(8080, () => {
  console.log('Your app is listening on port 8080')
  console.log('You can check the crawled pages on http://localhost:8080/')
  console.log('An example: http://localhost:8080/ssr-watchmatcher-brands.html')
})
