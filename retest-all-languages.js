const http = require('http');

const endpoint = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/v2/piston/execute',
};

const tests = [
  { key: 'javascript', code: "console.log('ok-js')" },
  { key: 'typescript', code: "const x: number = 7; console.log('ok-ts', x);" },
  { key: 'python', code: "print('ok-py')" },
  { key: 'c', code: "#include <stdio.h>\nint main(){ puts(\"ok-c\"); return 0; }" },
  { key: 'c++', code: "#include <iostream>\nint main(){ std::cout << \"ok-cpp\\n\"; return 0; }" },
  { key: 'csharp', code: "using System; class Program { static void Main() { Console.WriteLine(\"ok-cs\"); } }" },
  { key: 'java', code: "public class Main { public static void main(String[] args){ System.out.println(\"ok-java\"); } }" },
  { key: 'go', code: "package main\nimport \"fmt\"\nfunc main(){ fmt.Println(\"ok-go\") }" },
  { key: 'rust', code: "fn main(){ println!(\"ok-rust\"); }" },
  { key: 'fortran', code: "program main\n  print *, 'ok-fortran'\nend program main" },
  { key: 'zig', code: "const std = @import(\"std\");\npub fn main() void { std.debug.print(\"ok-zig\\n\", .{}); }" },
  { key: 'asm', code: ".intel_syntax noprefix\n.section .rdata,\"dr\"\nmsg: .asciz \"ok-asm\"\n.text\n.globl main\n.extern puts\nmain:\n  sub rsp, 40\n  lea rcx, msg[rip]\n  call puts\n  xor eax, eax\n  add rsp, 40\n  ret" },
  { key: 'asm-x64', code: ".intel_syntax noprefix\n.section .rdata,\"dr\"\nmsg: .asciz \"ok-asm-x64\"\n.text\n.globl main\n.extern puts\nmain:\n  sub rsp, 40\n  lea rcx, msg[rip]\n  call puts\n  xor eax, eax\n  add rsp, 40\n  ret" },
  { key: 'asm-nasm', code: "section .data\nmsg db \"ok-asm-nasm\",0\nsection .text\nglobal main\nextern puts\nmain:\n  sub rsp, 40\n  lea rcx, [rel msg]\n  call puts\n  xor eax, eax\n  add rsp, 40\n  ret" },
  { key: 'ruby', code: "puts 'ok-ruby'" },
  { key: 'sql', code: "SELECT 'ok-sql' AS result;" },
  { key: 'powershell', code: "Write-Output 'ok-powershell'" },
  { key: 'bash', code: "echo 'ok-bash'" },
];

function runOne(test) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      language: test.key,
      files: [{ content: test.code }],
    });

    const req = http.request(
      {
        ...endpoint,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => {
          raw += chunk;
        });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(raw || '{}');
            const output = String(parsed?.run?.stdout || parsed?.run?.output || parsed?.message || '').trim();
            resolve({
              key: test.key,
              status: res.statusCode || 0,
              ok: (res.statusCode || 0) < 400,
              output: output.split('\n')[0].slice(0, 120),
            });
          } catch (error) {
            resolve({
              key: test.key,
              status: res.statusCode || 0,
              ok: false,
              output: `parse-error: ${error.message}`,
            });
          }
        });
      }
    );

    req.on('error', (error) => {
      resolve({ key: test.key, status: 0, ok: false, output: `request-error: ${error.message}` });
    });

    req.setTimeout(30000, () => {
      req.destroy(new Error('timeout'));
    });

    req.write(body);
    req.end();
  });
}

(async () => {
  console.log('=== RETEST ALL RUNTIME LANGUAGES ===');
  const results = [];

  for (const test of tests) {
    const result = await runOne(test);
    results.push(result);
    const mark = result.ok ? 'OK ' : 'ERR';
    console.log(`${mark} [${String(result.status).padEnd(3)}] ${result.key.padEnd(10)} ${result.output || '(no output)'}`);
  }

  const failures = results.filter((r) => !r.ok);
  console.log('\n=== SUMMARY ===');
  console.log(`total=${results.length} ok=${results.length - failures.length} fail=${failures.length}`);
  if (failures.length) {
    console.log('failed:', failures.map((f) => f.key).join(', '));
  }
})();
