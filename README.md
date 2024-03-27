# Univer Docs <picture><source media="(prefers-color-scheme: dark)" srcset="./src/assets/logo-light.svg"><source media="(prefers-color-scheme: light)" srcset="./packages/shared/assets/logo-dark.svg"><img align="right" valign="center" height="100" src="./packages/shared/assets/logo-light.svg" alt="Univer Logo" /></picture>

[![CC-BY-NC-SA-4.0](https://img.shields.io/badge/license-CC--BY--NC--SA--4.0-blue)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en)
[![Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue)](https://www.apache.org/licenses/LICENSE-2.0)
[![Deploy](https://github.com/dream-num/docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/dream-num/docs/actions/workflows/deploy.yml)

This is the repo for [univer.ai](https://univer.ai). This repo contains the source code for the official website, as well as the documentation for the Univer API, blog posts, and other resources.

[简体中文](https://univer.ai) | [English](https://univer.ai/en-us) | [日本語](https://univer.ai/ja-jp)

## Contributing

Please feel free to contribute to this repo by submitting a pull request. If you have any questions, please contact us at [developer@univer.ai](mailto:developer@univer.ai).

The documentation is built using [Astro](https://astro.build) and [Typedoc](https://typedoc.org). Before you begin contributing, please make sure you are familiar with the usage of these two tools.

### Contribute PRs by Developing Locally

To begin contributing, fork this repo and clone it to your local machine.

```bash
# Clone the forked repo
git clone git@github.com:<YOUR_USERNAME>/<REPO_NAME>.git
```

Before you begin, please make sure your development environment meets the following requirements:

- node.js >= 18.0.0
- pnpm >= 8.0.0

After confirming that your development environment meets the above requirements, you can execute the following command to start developing:

```bash
# Install dependencies
pnpm i

# Start the development server
pnpm dev

# Build the website
pnpm build

# If you want to update the api docs, please execute `pnpm up univer` to update the univer version.
pnpm up
```

### Contribute PRs using an online code editor

If you don't want to install the development environment locally, or your local environment doesn't meet the development requirements, you can use an online code editor to develop.

You can click the following button to open this repo in StackBlitz:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/dream-num/docs)

### Graphs

Graphs help users to understand your ideas better. To keep styles of graphs consistent, we use [Excalidraw](https://excalidraw.com/) to create graphs. We store the source files of graphs in this repo directly. It is recommend to install [Excalidraw VSCode extension](https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor) and use it to edit the source files.
