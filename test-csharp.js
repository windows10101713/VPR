const http = require('http');

const body = JSON.stringify({
  language: 'csharp',
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
    console.log('Response:', data);
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.log('Error:', e.message);
  process.exit(1);
});

req.write(body);
req.end();
