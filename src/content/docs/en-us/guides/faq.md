---
title: FAQ
---

## Installation Related

### Why am I getting an error when importing Univer in my webpack 4 project?

- Webpack 4 may not recognize the `exports` field in `packages.json` correctly. Please refer to [webpack/webpack#9509](https://github.com/webpack/webpack/issues/9509) for more details. You need to locate the correct path and import it manually. Some third-party dependencies may require setting up aliases using `resolve.alias` in the configuration.
- In some webpack 4 scaffolds, the default babel configuration may not handle dependencies under node_modules. You may need to manually modify the webpack rules and add `@univerjs/*` to the `include` configuration of babel-loader.

We have provided an [online demo](/playground?title=Webpack%204) based on webpack 4 that might help you resolve this issue.