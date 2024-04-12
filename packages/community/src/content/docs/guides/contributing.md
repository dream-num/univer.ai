---
title: Contribution Guides
---

First, please read our [Code of Conduct](https://github.com/dream-num/univer/blob/dev/CODE_OF_CONDUCT.md) to ensure that you can abide by our guidelines.

We warmly welcome your contributions to Univer in various forms, including but not limited to:

## Github Issues

If you encounter any issues while using Univer or have any suggestions, feel free to raise them in our Github Issues. We will respond as quickly as possible.

To help us assist you better and faster, we recommend the following:

1. Before creating an issue, please search to see if someone has already raised a similar problem.
2. We provide issue templates, and we encourage you to provide sufficient information following the template, as it helps us pinpoint the problem more quickly.
3. Please try to describe the issue in English, as it allows more people to participate in the discussion. We will also strive to respond in English to benefit a wider audience.

## Contributing Code

If you would like to contribute code to Univer, please take note of the following:

### Environment

Univer's development environment relies on Node.js and pnpm. Please ensure that you have Node.js version 18.17.0 or above, and pnpm version 8.6.2 or above.

### Development Workflow

1. [Fork](https://github.com/dream-num/univer/fork) this repository to your GitHub account.
2. Clone the forked repository to your local machine.
3. Create a new branch in your local repository. The branch name can be arbitrary, but we recommend using prefixes such as `feat/`, `fix/`, `docs/`, `chore/`, `test/` to distinguish different types.
4. Develop on the new branch.
5. Commit your changes in your local repository.
6. Push your changes to your forked repository.
7. Submit a Pull Request on GitHub.

Some useful commands you may need:

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev:demo

# Run tests
pnpm test
```

#### Code Structure

The source code structure of Univer is as follows:

```bash
|- common/
|- models/
|- services/
|- commands/
  |- commands/
  |- mutations/
  |- operations/
|- controllers/
|- views/
  |- components/
  |- parts/
|- plugin.ts
|- index.ts
```

Regarding module imports, we adhere to the following rules:

- `common` cannot import files from other folders.
- `models` can only import files from `common`.
- `services` can only import files from `models` and `common`.
- `commands` can only import files from `services`, `models`, and `common`.

Avoid creating barrel imports (index.ts) unless it is the main root index.ts file for a plugin.

#### Naming Conventions

To ensure code quality and consistency, please follow these guidelines:

- Use kebab-case for file and folder names. If a file contains a React component, it should be named using PascalCase. For example: `SheetTab.tsx`.
- Use plural form for folder names.
- Interface names should start with a capital letter "I".
- Address all ESLint issues in the code.
- Use standard type names such as `.service`, `.controller`, `.menu`, `.command`, `.mutation`, and `.operation`. If necessary, you can invent other type names, but please be mindful not to create too many.

### Pull Request

Before merging a Pull Request, please ensure that the following requirements are met:

- All tests must pass, and ESLint and Prettier errors should be resolved.
- Test coverage should not decrease.

We provide preview deployments for Pull Requests. You can view the preview deployment by clicking on the preview link in the "View Deployment" section.

#### Storybook

We use Storybook for component development and testing. You can start Storybook with the following command:

```bash
pnpm storybook:dev
```

A preview of Storybook will be automatically deployed alongside your Pull Request.

#### Commit & Pull Request Message

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages. Commit messages that do not meet the specification will fail the CI check.

### Contributing Plugin

If you want to contribute code to a Univer plugin, the plugin may have some special rules of its own, so be sure to read the contribution guidelines in the plugin section in detail

- [How to add formulas in UniverFormulaEnginePlugin](/api/sheets-formula/#how-to-add-formulas-in-univerformulaengineplugin)