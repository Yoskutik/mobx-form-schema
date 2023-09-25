const path = require('path');
const fs = require('fs');

module.exports = function () {
  const filename = path.basename(this.resourcePath);
  const code = fs.readFileSync(this.resourcePath, { encoding: 'utf-8' });

  const data = { filename, code };

  return `
    const data = ${JSON.stringify(data)};
    export default data;
  `;
};
