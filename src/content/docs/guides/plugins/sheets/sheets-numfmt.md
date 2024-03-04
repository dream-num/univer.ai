---
title: "@univerjs/sheets-numfmt"
---

[![npm version](https://img.shields.io/npm/v/@univerjs/sheets-numfmt)](https://npmjs.org/package/@univerjs/sheets-numfmt)

Providing editing/rendering capabilities around `number format`, such as edit panels, toolbar buttons, real-time previews, row/column variations, etc.

:::Note
Numerical format is one of the core functions of electronic spreadsheets, and therefore, parsing and handling of numerical format is done within `@univerjs/sheets`.
:::

## How to use
Import `@univerjs/sheets-numfmt`  at the entrance .
```ts
import { LocaleType, LogLevel, Univer } from '@univerjs/core';
import { defaultTheme } from '@univerjs/design';
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt';


// univer
const univer = new Univer({
    theme: defaultTheme,
    locale: LocaleType.ZH_CN,
    locales,
    logLevel: LogLevel.VERBOSE,
});

// ... Other plug-ins are registered

univer.registerPlugin(UniverSheetsNumfmtPlugin);
```

:::note
If you need to export the snapshot to support the export data format, you need to add [some additional code](/)
:::


<!--package-locales start-->
<!--package-locales end-->

<!--package-assets start-->
<!--package-assets end-->