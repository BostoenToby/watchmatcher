import express from 'express'
import { querySite } from './crawler'

const app = express()

const sites = ['spa', 'ssr', 'ssg']
const pages = ['', 'brands', 'watches', 'matcher']
const brands = ['rolex', 'audemars-piguet', 'patek-philippe', 'hublot']
const watches = ['grande-sonnerie-carillon-supersonnerie', 'tourbillon']

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/index.html')
})

app.get('/query', (req, res) => {
  res.sendFile(__dirname + '/data/accra-silverbird.json', {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
})

app.get('/crawl', async (req, res) => {
  for (let site of sites) {
    for (let page of pages) {
      await querySite(site, page)
      if (page == 'brands') {
        for (let brand of brands) {
          await querySite(site, `brands-${brand}`)
        }
      } else if (page == 'watches') {
        for (let watch of watches) {
          await querySite(site, `watches-${watch}`)
        }
      }
    }
  }
})

app.listen(8080, () => {
  console.log('Your app is listening on port 8080')
})
