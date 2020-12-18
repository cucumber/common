const fs = require('fs')
const path = process.argv[2]
const html = fs.readFileSync(path, 'utf-8')
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html)
  await page.pdf({path: 'hn.pdf', format: 'A4'});
  const dynamicHTML = await page.evaluate(() => {
    const content = document.querySelector('.cucumber-react')
    return content && content.innerHTML
  });
  await browser.close();

  if(!dynamicHTML) {
    console.error(`The file ${path} did not render a .cucumber-react element. Inspect manually.`)
    process.exit(1)
  }
  console.log(`${path} rendered OK!`)
})();
