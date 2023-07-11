const { execSync } = require('child_process');

const run = (name, cmd) => {
  console.log(name);
  console.log(`  > ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
};

run('Legacy decorators', 'yarn --cwd packages/form-schema jest 2> /dev/null');
run('ES decorators', 'ES6_DECORATORS=1 yarn --cwd packages/form-schema jest 2> /dev/null');
run('Coverage', 'ES6_DECORATORS=1 JEST_WITH_COVERAGE=1 yarn --cwd packages/form-schema jest --coverage');