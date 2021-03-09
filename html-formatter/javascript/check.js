const fs = require('fs')
const path = process.argv[2]
const html = fs.readFileSync(path, 'utf-8')
const puppeteer = require('puppeteer')

async function check() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setContent(html)
  const dynamicHTML = await page.evaluate(() => {
    const content = document.querySelector('.cucumber-react')
    return content && content.innerHTML
  })
  await browser.close()

  if(!dynamicHTML) throw new Error(`The file ${path} did not render a .cucumber-react element. Inspect manually.`)
}

check().then(() => console.log(`${path} rendered OK!`)).catch((err) => {
  console.error(err.stack)
  process.exit(1)
})
