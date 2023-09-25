const https = require('https');
const path = require('path');
const fs = require('fs');

const appDir = path.resolve(__dirname, '../../');

const file = path.resolve(appDir, 'packages/mobx-form-schema/dist/mobx-form-schema.production.js');
const size = fs.statSync(file).size;
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
