const { execSync } = require('child_process');

const countLinesOfExt = (directory, ext) => (
  +execSync(`find ${directory} -type f -name "*${ext}" -exec grep -v \'^$\' {} + | wc -l`).toString().trim()
);

const countLines = (directory) => (
  countLinesOfExt(directory, '.tsx') + countLinesOfExt(directory, '.ts')
);

const totalLines = countLines('./src');
const componentsLines = countLines('./src/components');

console.log(
  JSON.stringify(
    {
      totalLines,
      componentsLines,
    },
    undefined,
    2,
  )
);