fetch('https://emkc.org/api/v2/piston/execute', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    language: 'python',
    version: '*',
    files: [{ content: 'print("hello")' }],
    stdin: '',
    args: [],
    compile_timeout: 10,
    run_timeout: 10
  })
})
.then(r => {
  console.log('Status:', r.status);
  console.log('Headers:', Object.fromEntries(r.headers));
  return r.text();
})
.then(text => {
  console.log('Response:', text);
  try {
    console.log('Parsed:', JSON.stringify(JSON.parse(text), null, 2));
  } catch (e) {
    console.log('Could not parse as JSON');
  }
})
.catch(e => console.error('Error:', e.message));
