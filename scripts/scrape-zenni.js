const path = require('path');
const fs = require('fs');
let scraper = require('website-scraper');
const scrape = scraper && (scraper.default || scraper.scrape || scraper);

const outputDir = path.resolve(__dirname, '../public/assets/zenni-scrape');
if (fs.existsSync(outputDir)) fs.rmSync(outputDir, { recursive: true, force: true });

(async () => {
  try {
    await scrape({
      urls: ['https://www.zennioptical.com/'],
      directory: outputDir,
      maxDepth: 1,
      requestConcurrency: 5,
      urlFilter: (url) => url.startsWith('https://www.zennioptical.com/'),
      sources: [
        { selector: 'img', attr: 'src' },
        { selector: 'link[rel="icon"]', attr: 'href' },
        { selector: 'link[rel="apple-touch-icon"]', attr: 'href' },
        { selector: 'link[rel="stylesheet"]', attr: 'href' }
      ],
      subdirectories: [
        { directory: 'img', extensions: ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'] },
        { directory: 'css', extensions: ['.css'] },
        { directory: 'icons', extensions: ['.ico'] }
      ],
      request: { headers: { 'User-Agent': 'Mozilla/5.0 (+clone-demo)' } }
    });
    console.log('✅ Zenni homepage assets downloaded to', outputDir);
  } catch (e) {
    console.error('❌ Failed to scrape:', e && e.message ? e.message : e);
    process.exit(1);
  }
})();
