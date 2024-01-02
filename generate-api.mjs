import TypeDoc from 'typedoc';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __packages = resolve(__dirname, './node_modules/univer/packages');
const __output = resolve(__dirname, './api');

// clean output
if (fs.existsSync(__output)) {
  fs.rmdirSync(__output, { recursive: true });
} else {
  fs.mkdirSync(__output);
}

const packages = fs.readdirSync(__packages)
  .filter((pkg) => {
    const pkgJson = fs.readFileSync(resolve(__packages, pkg, './package.json'), 'utf8');
    const pkgJsonParsed = JSON.parse(pkgJson);

    return !pkgJsonParsed.private;
  });

for (const pkg of packages) {
  const app = await TypeDoc.Application.bootstrapWithPlugins({
    entryPoints: resolve(__packages, pkg, 'src/index.ts'),
    tsconfig: resolve(__packages, pkg, 'tsconfig.json'),
    externalPattern: ['**/node_modules/univer/node_modules/**'],
    excludeExternals: true,
    excludeInternal: true,
    excludePrivate: true,
    excludeProtected: true,
    disableGit: true,
    disableSources: true,
    customCss: './style.css',
    readme: 'none',
    hideGenerator: true,
  });

  const project = await app.convert();

  if (project) {
    const outputDir = resolve(__output, pkg);
    await app.generateDocs(project, outputDir);
  }
}
