const fs = require('fs');
const content = fs.readFileSync('COMPLETE_CODE_SNAPSHOT.md', 'utf8').split('\n');
let appStart = 0, appEnd = 0;
for (let i = 0; i < content.length; i++) {
  if (content[i].includes('## app.js')) {
    appStart = i + 2;
  }
  if (appStart > 0 && i > appStart && content[i].trim() === '```') {
    appEnd = i;
    break;
  }
}
console.log(`Found: lines ${appStart} to ${appEnd}`);
if (appEnd === 0) {
  console.log('ERROR: Could not find app.js section boundaries');
  process.exit(1);
}
const appCode = content.slice(appStart, appEnd).join('\n');
fs.writeFileSync('app.js', appCode, 'utf8');
console.log(`✓ Restored app.js (${appCode.length} bytes)`);
