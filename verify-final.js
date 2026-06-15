const http = require('http');

const tests = [
  ['JavaScript', 'javascript', 'console.log("Hello JS"); console.log(1+2)'],
  ['TypeScript', 'typescript', 'const x: number = 42; console.log(x)'],
  ['Python',     'python',     'print("Hello Python")\nprint(1+2)'],
  ['C',          'c',          '#include <stdio.h>\nint main(){ printf("Hello C\\n"); return 0; }'],
  ['C++',        'c++',        '#include <iostream>\nint main(){ std::cout<<"Hello C++"<<std::endl; }'],
  ['C#',         'csharp',     'using System;\nclass Program { static void Main() { Console.WriteLine("Hello C#"); } }'],
  ['Java',       'java',       'public class Main { public static void main(String[] a) { System.out.println("Hello Java"); } }'],
  ['Go',         'go',         'package main\nimport "fmt"\nfunc main(){ fmt.Println("Hello Go") }'],
  ['Ruby',       'ruby',       'puts "Hello Ruby"'],
  ['SQL',        'sql',        'SELECT 42 AS answer;'],
  ['Bash',       'bash',       'echo "Hello Bash"'],
  ['PowerShell', 'powershell', 'Write-Output "Hello PowerShell"'],
];

let i = 0;
function next() {
  if (i >= tests.length) { console.log('\n=== DONE ==='); return; }
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
        const out = (r.run?.stdout || r.run?.output || r.message || '').trim().split('\n')[0];
        const ok = out && !out.includes('not installed') && !out.includes('missing') && !out.includes('Error:') && !out.includes('Command failed:');
        console.log((ok ? '✅' : '❌') + ' ' + name.padEnd(12) + ' ' + out.slice(0, 50));
      } catch(e) { console.log('❌ ' + name + ' PARSE ERROR'); }
      setTimeout(next, 800);
    });
  });
  req.on('error', e => { console.log('❌ ' + name + ' CONN'); setTimeout(next, 500); });
  req.write(body);
  req.end();
}

console.log('=== 최종 언어 검증 ===\n');
next();
