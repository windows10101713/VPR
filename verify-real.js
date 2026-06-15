const http = require('http');

const tests = [
  ['Java', 'java', 'public class Main { public static void main(String[] a) { System.out.println("Hello from Java REAL"); } }'],
  ['Go', 'go', 'package main\nimport "fmt"\nfunc main() { fmt.Println("Hello from Go REAL") }'],
  ['Rust', 'rust', 'fn main() { println!("Hello from Rust REAL"); }'],
  ['Python', 'python', 'print("Hello from Python REAL")\nprint(3+7)'],
  ['C', 'c', '#include <stdio.h>\nint main(){ printf("Hello from C REAL\\n"); return 0; }'],
  ['C++', 'c++', '#include <iostream>\nint main(){ std::cout<<"Hello from C++ REAL"<<std::endl; return 0; }'],
];

let i = 0;
function next() {
  if (i >= tests.length) { console.log('\nDone'); return; }
  const [name, lang, code] = tests[i++];
  const body = JSON.stringify({ language: lang, files: [{ content: code }] });
  const req = http.request({
    hostname: 'localhost', port: 3000, path: '/api/v2/piston/execute',
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
      try {
        const r = JSON.parse(d);
        const out = (r.run?.stdout || r.run?.output || r.message || '').trim();
        const lines = out.split('\n').slice(0, 2).join(' | ');
        const isReal = out.includes('REAL');
        const isFail = out.includes('not installed') || out.includes('missing') || !out;
        console.log((isReal ? '✅ REAL' : isFail ? '❌ FAIL' : '⚠️  MOCK') + ' ' + name.padEnd(10) + ' ' + lines.slice(0, 60));
      } catch(e) {
        console.log('❌ PARSE ' + name + ': ' + e.message);
      }
      setTimeout(next, 1000);
    });
  });
  req.on('error', e => { console.log('❌ ERR ' + name + ': ' + e.message); setTimeout(next, 500); });
  req.write(body);
  req.end();
}

console.log('=== Real Runtime Verification ===\n');
next();
