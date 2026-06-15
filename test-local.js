const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/v2/piston/execute',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => { console.log('Response:', data); process.exit(0); });
});

req.on('error', e => {
  console.error(`Problem: ${e.message}`);
  process.exit(1);
});

const body = JSON.stringify({
  language: 'javascript',
  files: [{ content: 'console.log("hello")' }]
});

console.log('Sending:', body);
req.write(body);
req.end();
