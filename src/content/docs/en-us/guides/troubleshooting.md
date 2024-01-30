---
title: Troubleshooting
---

## Installation Related

### Why am I getting an error when importing Univer in my webpack 4 project?

- Webpack 4 may not recognize the `exports` field in `packages.json` correctly. Please refer to [webpack/webpack#9509](https://github.com/webpack/webpack/issues/9509) for more details. You need to locate the correct path and import it manually. Some third-party dependencies may require setting up aliases using `resolve.alias` in the configuration.
- In some webpack 4 scaffolds, the default babel configuration may not handle dependencies under node_modules. You may need to manually modify the webpack rules and add `@univerjs/*` to the `include` configuration of babel-loader.

We have provided an [online demo](/playground?title=Webpack%204) based on webpack 4 that might help you resolve this issue.

### Why do some plugins report errors when registering while using `<script>` to introduce the Univer UMD package?

- Please make sure you have introduced the prerequisite dependencies used by the plugins in order.
- You can find the prerequisite dependencies required for the plugin to run in the `peerDependencies` field of the plugin's documentation page or the `packages.json` of the plugin source code.

### Why do I get an error saying that dependencies cannot be found when I install with npm or yarn?

- yarn 1 and npm 6 will not automatically install `peerDependencies` from `packages.json`, see [package-json#peerdependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies).
- It is recommended to upgrade the node version to 16 or above, or upgrade the npm version to 8 or above.
