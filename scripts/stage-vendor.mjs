// Copies every library the page needs out of node_modules into www/vendor,
// so the APK works with no internet. Fails loudly if anything is missing.
import { cpSync, existsSync, mkdirSync, rmSync, statSync } from 'node:fs';

const out = 'www/vendor';
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const files = [
  ['node_modules/lucide/dist/umd/lucide.js', `${out}/lucide.js`],
  ['node_modules/fengari-web/dist/fengari-web.js', `${out}/fengari-web.js`],
  ['node_modules/three/build/three.min.js', `${out}/three.min.js`],
];
for (const [from, to] of files) {
  if (!existsSync(from)) throw new Error(`Missing ${from}`);
  cpSync(from, to);
}

// Python (Pyodide core: runtime + wasm + stdlib)
if (!existsSync('node_modules/pyodide/pyodide.asm.wasm')) throw new Error('Missing pyodide core files');
cpSync('node_modules/pyodide', `${out}/pyodide`, {
  recursive: true,
  filter: (p) => !/node_modules\/pyodide\/(package\.json|README|LICENSE|.*\.d\.ts|.*\.map)$/i.test(p) || /pyodide-lock/.test(p),
});
for (const f of ['pyodide.js', 'pyodide.asm.js', 'pyodide.asm.wasm', 'python_stdlib.zip', 'pyodide-lock.json']) {
  if (!existsSync(`${out}/pyodide/${f}`)) throw new Error(`Pyodide file missing: ${f}`);
}
const mb = (statSync(`${out}/pyodide/pyodide.asm.wasm`).size / 1048576).toFixed(1);
console.log(`Vendor files staged (pyodide wasm ${mb} MB).`);
