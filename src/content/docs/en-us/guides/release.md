---
title: Releases
---

## Alpha Release

Currently, the unstable versions are divided into the alpha and beta release channels. The alpha version is released with the `@alpha` tag, while the beta version is released directly with `@latest`.

To install the alpha version, use the following command:

```shell
npm install @univerjs/<package-name>@alpha
```

## Nightly Release

Every night, Univer builds a version that includes the latest features and bug fixes for testing purposes. To install this version, you can switch your npm registry to our private npm registry.

We recommend creating a `.npmrc` file in the root directory of your project with the following contents:

```Properties title=".npmrc"
@univerjs:registry=https://univer.work/verdaccio/
```

Then, you can install the nightly version using the following command:

```shell
npm install @univerjs/<package-name>@nightly
```
