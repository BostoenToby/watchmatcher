import fs from 'fs'
import request from 'request'

let requestPage = (url: string, cachePath: string) => {
    request(url, (err, response, html) => {
        if(err) {
            return console.log(err)
        }
        fs.writeFile(cachePath, html, err => {
            if(err) {
                return console.log(err)
            }
        })
    })
}

let querySite = (site: string, path: string = '') => {
    if(fs.existsSync('crawl') == false){
        fs.mkdirSync('crawl')
    }
    let cacheFile = `crawl/${site}-watchmatcher-${path}.html`
    if(path == ''){
        cacheFile = `crawl/${site}-watchmatcher.html`
    }
    const apiUrl = `https://watchmatcher${site}.tobybostoen.be/${path}`
    requestPage(apiUrl, cacheFile)
}

export default querySite