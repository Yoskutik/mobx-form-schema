const https = require('https');
const path = require('path');
const fs = require('fs');

const appDir = path.resolve(__dirname, '../../');

const files = fs.readdirSync(path.resolve(appDir, 'packages/form-schema/dist'))
  .filter(it => it.endsWith('.js'))
  .map(it => path.resolve(appDir, 'packages/form-schema/dist', it));

const size = files.reduce((acc, file) => acc + fs.statSync(file).size, 0);
const weight = `%E2%89%A4%20${Math.round(size / 10) / 100}KB`;

console.log(`New package size is ${decodeURI(weight)}`);

https
  .get(`https://img.shields.io/badge/Weight-${weight}-green`, resp => {
    let data = '';

    resp.on('data', chunk => {
      data += chunk;
    });

    resp.on('end', () => {
      fs.writeFileSync(path.resolve(appDir, 'badges/weight.svg'), data);
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });
