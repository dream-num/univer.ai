---
title: 贡献指南
---

首先请阅读我们的 [Code of Conduct](https://github.com/dream-num/univer/blob/dev/CODE_OF_CONDUCT.md)，确保你能遵守我们的行为准则。

我们非常欢迎你以任何形式参与到 Univer 的开发中来，包括但不限于：

## Github Issues

如果你在使用 Univer 的过程中遇到了问题，或者有任何建议，欢迎在 Github Issues 中提出。我们会尽快回复。

为了能够更好更快地帮助你，我们建议：

1. 请提出 Issue 之前先搜索一下，看看是否有人已经提出了类似的问题。
2. 我们提供了 Issue 模板，希望你依此填写提供足够的信息，这可以让我们更快地定位问题。
3. 请尽量使用英文描述问题，这样可以让更多的人参与到讨论中来。我们也会尽量使用英文回复，以便更多的人能够受益。

## Contributing Code

如果你想要为 Univer 贡献代码，请了解以下事项：

### 环境

Univer 的开发环境依赖 Node.js 和 pnpm，请确保你的 Node.js 版本在 18.17.0 及以上，pnpm 的版本在 8.6.2 及以上。

### 开发流程

1. [Fork](https://github.com/dream-num/univer/fork) 本仓库到你的 Github 账号下。
2. Clone 你 Fork 的仓库到本地。
3. 在本地仓库中创建一个新的分支，分支名可以是任意的，但是建议使用 `feat/`、`fix/`、`docs/`、`chore/`、`test/` 等前缀来区分不同的类型。
4. 在新分支上进行开发。
5. 在本地仓库中提交你的修改。
6. Push 你的修改到你 Fork 的仓库。
7. 在 Github 上提交 Pull Request。

一些可能用得到的命令：

```bash
# 安装依赖
pnpm install

# 启动开发服务
pnpm dev:demo

# 启动测试
pnpm test
```

#### 代码结构

Univer 的源码结构如下：

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

对于模块导入，我们遵循以下规则：

- `common` 不能导入其他文件夹中的文件
- `models` 只能导入 `common` 中的文件
- `services` 只能导入 `models` 和 `common` 中的文件
- `commands` 只能导入 `services`、`models` 和 `common` 中的文件

避免创建 barrel imports (index.ts)，除非它是插件的主要根 index.ts 文件。

#### 命名规范

为了保证代码质量和一致性，请遵循以下准则：

- 文件名和文件夹名使用 kebab-case。如果文件包含 React 组件，它应该是大驼峰命名法。例如：`SheetTab.tsx`。
- 文件夹名使用复数形式。
- 接口名以大写字母 I 开头。
- 解决代码中的所有 ESLint 问题。
- 使用 .service、.controller、.menu、.command、.mutation 和 .operation 等常规类型名。如果必须，可以发明其他类型名，但是请注意不要创建太多。

### Pull Request

在合并 Pull Request 之前，请确保满足以下要求：

- 所有测试都必须通过，修复 ESLint 和 Prettier 的错误。
- 测试覆盖率不能降低。

我们提供为 Pull Request 提供预览部署。你可以通过点击“View Deployment”部分的预览链接查看预览部署。

#### Storybook

我们使用 Storybook 来开发和测试组件。你可以通过以下命令启动 Storybook：

```bash
pnpm storybook:dev
```

创建 Pull Request 的同时，Storybook 的预览也会自动部署。

#### Commit & Pull Request Message

我们使用 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 作为 Commit Message 的规范。不符合规范的 Commit Message 将无法通过 CI 检查。

### 贡献插件

如果你想为某个 Univer 插件贡献代码，插件可能会有自己的一些特殊规则，请务必详细阅读插件部分的贡献指南

- [公式贡献指南](/zh-cn/guides/customization/formula/#如何在-formula-engine-中添加公式)