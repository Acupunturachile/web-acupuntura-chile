const https = require('https');

const urls = [
  'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c',
  'https://images.unsplash.com/photo-1570128690325-2cbafebc7c57',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
  'https://images.unsplash.com/photo-1552693673-1bf9582989cc', 
  'https://images.unsplash.com/photo-1620052329302-3c29215b2447', 
];

async function check() {
  for (const url of urls) {
    await new Promise(resolve => {
      https.get(url, (res) => {
        console.log(url, res.statusCode);
        res.resume();
        resolve();
      }).on('error', resolve);
    });
  }
}
check();
