const http = require('http');

const langs = ['typescript', 'cpp', 'csharp'];

async function test(lang) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      language: lang,
      files: [{ content: 'test' }]
    });

    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/v2/piston/execute',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const result = JSON.parse(data);
        console.log(`${lang}: ${result.run?.stdout || '(no output)'}`);
        resolve();
      });
    });
    req.on('error', e => {
      console.log(`${lang}: ERROR - ${e.message}`);
      resolve();
    });
    req.setTimeout(5000, () => {
      req.destroy();
      console.log(`${lang}: TIMEOUT`);
      resolve();
    });
    req.write(body);
    req.end();
  });
}

(async () => {
  for (const lang of langs) {
    await test(lang);
    await new Promise(r => setTimeout(r, 300));
  }
})();
