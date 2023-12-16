import { generateTypeDoc } from 'starlight-typedoc'

const packages =  [
  'core',
  'design',
  'docs',
  'docs-ui',
  'engine-formula',
  'engine-numfmt',
  'engine-render',
  // 'image',
  // 'local-save',
  'network',
  'rpc',
  'sheets',
  // 'sheets-find',
  'sheets-formula',
  // 'sheets-import-xlsx',
  'sheets-numfmt',
  'sheets-ui',
  // 'slides',
  // 'slides-ui',
  'ui',
  'uniscript',
]


const typeDocSdierbarGroups = await Promise.all(packages.map(async (pkg) => {
  const packageSidebarGroup = await generateTypeDoc({
    entryPoints: [`./submodules/univer/packages/${pkg}/src/index.ts`],
    tsconfig: `./submodules/univer/packages/${pkg}/tsconfig.json`,
    typeDoc: {
      name: pkg,
      excludeExternals: true,
      excludeInternal: true,
      excludePrivate: true,
      excludeProtected: true,
      excludeReferences: true,
      disableSources: true,
    },
    output: `./api/${pkg}`
  })

  packageSidebarGroup.label = `@univerjs/${pkg}`
  packageSidebarGroup.items = packageSidebarGroup.items.map(item => {
    item.autogenerate.directory = item.autogenerate.directory.replace('./', '')
    return item
  })

  return packageSidebarGroup
}))

export default {
  title: 'Univer Docs',
  logo: {
    light: './src/assets/logo-dark.svg',
    dark: './src/assets/logo-light.svg',
  },
  social: {
    github: 'https://github.com/dream-num/univer',
    discord: 'https://discord.gg/z3NKNT6D2f',
  },
  customCss: ['./src/styles/starlight.css'],
  sidebar: [
    {
      label: 'API reference',
      collapsed: true,
      items: typeDocSdierbarGroups
    }
  ],
}
