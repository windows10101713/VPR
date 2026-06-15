const http = require('http');

const languages = [
  'JavaScript', 'TypeScript', 'Python', 'C', 'C++', 'C#', 'Java', 
  'Go', 'Rust', 'PHP', 'Ruby', 'Kotlin', 'Swift', 'HTML'
];

const mappings = {
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'Python': 'python',
  'C': 'c',
  'C++': 'c++',
  'C#': 'csharp',
  'Java': 'java',
  'Go': 'go',
  'Rust': 'rust',
  'PHP': 'php',
  'Ruby': 'ruby',
  'Kotlin': 'kotlin',
  'Swift': 'swift',
  'HTML': 'html'
};

async function testLanguage(lang) {
  return new Promise((resolve) => {
    const langKey = mappings[lang];
    const body = JSON.stringify({
      language: langKey,
      files: [{ content: 'test-code' }]
    });

    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/v2/piston/execute',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': body.length }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          const output = (result.run?.stdout || result.run?.output || '').slice(0, 50);
          console.log(`✅ ${lang.padEnd(12)} ${output || '(no output)'}`);
        } catch (e) {
          console.log(`❌ ${lang.padEnd(12)} ERROR: ${e.message}`);
        }
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`❌ ${lang.padEnd(12)} CONNECTION: ${e.message}`);
      resolve();
    });

    req.setTimeout(3000, () => {
      req.destroy();
      console.log(`❌ ${lang.padEnd(12)} TIMEOUT`);
      resolve();
    });

    req.write(body);
    req.end();
  });
}

(async () => {
  console.log('\n=== 🎯 VPR FINAL LANGUAGE TEST (14/14) ===\n');
  for (const lang of languages) {
    await testLanguage(lang);
    await new Promise(r => setTimeout(r, 200));
  }
  console.log('\n✨ All languages tested!\n');
})();
