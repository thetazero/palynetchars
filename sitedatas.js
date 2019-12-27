const { parseString } = require('xml2js');
const fs = require('fs')
let file = fs.readFileSync('./sitemap.xml')
let data;
parseString(file, (err, { urlset }) => {
  if (err) throw err
  data = urlset.url.map(({ loc }) => { return loc[0] })
});

const Crawler = require("crawler");

let letter_counts = {}

const c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: (error, res, done) => {
    if (error) console.log(error)
    else {
      var $ = res.$;
      if ($) {
        let text = $("body").text().replace(/\s/g, '').toLowerCase().split('')
        for (let i = 0; i < text.length; i++) {
          let letter = text[i]
          if (letter in letter_counts) {
            letter_counts[letter]++
          } else {
            letter_counts[letter] = 1
          }
        }
      }
    }
    done();
  }
});

c.on('drain', () => {
  fs.writeFileSync('./letter_counts.json', JSON.stringify(letter_counts))
  console.log(letter_counts)
  console.log('done!')
})

c.queue(data)