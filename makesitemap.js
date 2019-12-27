const SitemapGenerator = require('sitemap-generator');
 
// create generator
const generator = SitemapGenerator('http://paly.net', {
  stripQuerystring: false
});
 
// register event listeners
generator.on('done', () => {
  console.log('sitemap created')
  // sitemaps created
});
 
generator.on('add', (url) => {
  console.log(url)
});

// start the crawler
generator.start();