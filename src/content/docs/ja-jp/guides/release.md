---
title: その他のリリース
---

## Alpha Release

現在、非安定バージョンは alpha と beta のリリースチャネルに分かれています。alpha バージョンは `@alpha` タグを使用してリリースされ、beta バージョンは直接 `@latest` でリリースされます。

alpha バージョンのインストール方法

```shell
npm install @univerjs/<パッケージ名>@alpha
```

## Nightly Release

Univer は毎晩ビルドされたバージョンを提供しており、最新の機能とバグ修正のテストに使用されます。

プロジェクトのルートディレクトリに `.npmrc` ファイルを作成し、npm のソースを設定することをおすすめします。以下の内容でファイルを作成します。

```Properties title=".npmrc"
@univerjs:registry=https://verdaccio.univer.work/
```

その後、nightlyバージョンをインストールします。

```shell
npm install @univerjs/<パッケージ名>@nightly
```
