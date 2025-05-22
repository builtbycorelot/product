const fs = require('fs');

function assert(condition, message) {
  if (!condition) {
    console.error('Test failed:', message);
    process.exit(1);
  }
}

const readme = fs.readFileSync('README.md', 'utf8');
assert(/3D Home Configure Module/.test(readme), 'README should mention 3D Home Configure Module');

console.log('All tests passed');
