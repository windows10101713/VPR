const http = require('http');

const languages = [
  'JavaScript', 'TypeScript', 'Python', 'C', 'C++', 'C#', 'Java', 
  'Go', 'Rust', 'PHP', 'Ruby', 'Kotlin', 'Swift', 'HTML'
];

const sampleCode = {
  'JavaScript': "console.log('Hello from JavaScript'); console.log(2 + 3);",
  'TypeScript': "console.log('Hello from TypeScript');",
  'Python': "print('Hello from Python')\nprint(2 + 3)",
  'C': "#include <stdio.h>\nint main() { printf(\"Hello from C\\n\"); return 0; }",
  'C++': "#include <iostream>\nint main() { std::cout << \"Hello from C++\\n\"; return 0; }",
  'C#': "class Main { static void Main() { System.Console.WriteLine(\"Hello from C#\"); } }",
  'Java': "public class Main { public static void main(String[] args) { System.out.println(\"Hello from Java\"); } }",
  'Go': "package main\nimport \"fmt\"\nfunc main() { fmt.Println(\"Hello from Go\") }",
  'Rust': "fn main() { println!(\"Hello from Rust\"); }",
  'PHP': "<?php echo 'Hello from PHP'; echo \"\\n\"; echo 2 + 3; ?>",
  'Ruby': "puts 'Hello from Ruby'\nputs 2 + 3",
  'Kotlin': "fun main() { println(\"Hello from Kotlin\") }",
  'Swift': "print(\"Hello from Swift\")",
  'HTML': "<h1>Hello from HTML</h1><p>Works!</p>"
};

async function testLanguage(lang) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      language: lang.toLowerCase(),
      files: [{ content: sampleCode[lang] }]
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
          const output = (result.run?.stdout || result.run?.output || '').slice(0, 60);
          console.log(`[${lang.padEnd(12)}] ${output || '(no output)'}`);
        } catch (e) {
          console.log(`[${lang.padEnd(12)}] ERROR parsing response`);
        }
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`[${lang.padEnd(12)}] CONNECTION ERROR`);
      resolve();
    });

    req.setTimeout(3000, () => {
      req.destroy();
      console.log(`[${lang.padEnd(12)}] TIMEOUT`);
      resolve();
    });

    req.write(body);
    req.end();
  });
}

(async () => {
  console.log('\n=== Testing All Languages ===\n');
  for (const lang of languages) {
    await testLanguage(lang);
    await new Promise(r => setTimeout(r, 500));
  }
  console.log('\n');
})();
