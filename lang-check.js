const { execSync } = require('child_process');

const tests = [
  ['javascript', 'node -e "console.log(\'OK\')"'],
  ['python', 'python --version'],
  ['go', 'go version'],
  ['ruby', 'ruby --version'],
  ['php', 'php -v'],
  ['rust', 'rustc --version'],
  ['csharp', 'csc /version'],
  ['java', 'java -version'],
  ['c', 'gcc --version'],
  ['cpp', 'g++ --version'],
];

console.log('=== 시스템 설치 언어 ===\n');
tests.forEach(([lang, cmd]) => {
  try {
    execSync(cmd, { stdio: 'ignore', timeout: 2000 });
    console.log(`✓ ${lang.padEnd(12)} INSTALLED`);
  } catch {
    console.log(`✗ ${lang.padEnd(12)} NOT FOUND`);
  }
});
