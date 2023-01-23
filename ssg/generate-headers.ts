import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { parse } from 'node-html-parser'

const __dirname = path.resolve()
const buildDir = path.join(__dirname, 'build')

const removeCSP = (input: fs.PathOrFileDescriptor) => {
  const content = fs.readFileSync(input, { encoding: 'utf-8' })
  const root = parse(content)
  const element = root.querySelector(
    'head meta[http-equiv="content-security-policy"]',
  )
  const elemCT = root.querySelector('head meta[http-equiv="expect-ct"]')
  const elemContent = element?.getAttribute('content')
  // @ts-ignore
  root.remove(element)
  // @ts-ignore
  root.remove(elemCT)
  return elemContent
}

const csp = new Map()

const findCSP = (start: string, filter = /\.html$/) => {
  if (!fs.existsSync(start)) console.error("Can't find path ", start)
  const files = fs.readdirSync(start)
  for (const file of files) {
    const f = path.join(start, file)
    if (fs.statSync(f).isDirectory()) {
      findCSP(f)
    } else if (filter.test(f)) {
      csp.set(
        f
          .replace(buildDir, '')
          .replace(/\.html$/, '')
          .replace(/^\/index$/, '/'),
        removeCSP(f),
      )
    }
  }
}

const createHead = () => {
  const head = `/*
    X-Frame-Options: SAMEORIGIN
    X-XSS-Protection: 1; mode=block
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    Permissions-Policy: accelerometer=(), camera=(), document-domain=(), encrypted-media=(), gyroscope=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=(), geolocation=()
    Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  const cspList: string[] = []
  csp.forEach((csp, path) => {
    cspList.push(`${path}\n Content-Security-Policy: ${csp}`)
  })

  const headF = path.join(buildDir, '_headers')
  fs.writeFileSync(headF, `${head}${cspList.join('\n')}`)
}

const main = async () => {
  findCSP(buildDir)
  createHead()
}

main()
