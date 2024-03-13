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

Every night, Univer builds a version that includes the latest features and bug fixes for testing purposes. To install this version.

To install the nightly version, we recommend creating a `.npmrc` file in the root directory of your project to configure the npm source, with the following content:

```Properties title=".npmrc"
@univerjs:registry=https://verdaccio.univer.work/
```

Then, you can install the nightly version using the following command:

```shell
npm install @univerjs/<package-name>@nightly
```
