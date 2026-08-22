# otta-lp-free 案件設定

## クライアント

- **会社名:** 株式会社otta
- **担当者:** 辻様

## 訴求

- **月々0円で始められる見守りサービス**（無料プラン推奨）
- 商材は `otta.a`（otta-lp-outing と同一）。プラン訴求のみ差し替え。

## 公開情報

- **公開URL:** https://www.otta.me/lp/senior-free/
- **ステージング:** https://otta-free.konokoe.design/lp/senior-free/
- **リポジトリ:** git@github.com:konokoe/otta-lp-free.git

## Astro 設定

```js
// astro.config.mjs
site: 'https://www.otta.me'
base: '/lp/senior-free'
```

## ターゲット

- 離れて暮らす親を持つ子世代（40〜60代）
- 親（シニア）の生活・安全に関心がある層

## 出自

- `otta-lp-outing`（https://www.otta.me/lp/senior-outing/ ）を複製して作成。
- デザイントークン・CSS設計ルール・既存コンポーネントはそのまま踏襲する。
- **文言・原稿は指示があった箇所のみ変更する。自己判断でコピーを書き換えない。**
- `design/` と `src/assets/` の旧アセットは流用の可能性があるため残置。

## ブランチ運用

- 作業ブランチ: `dev`
- main への反映: 明示的に指示があればClaudeがマージ可。指示なしでは行わない。

## Basic認証（ステージング）

- ID: `konokoe`
- PASS: `otta`
- Cloudflare Workers の Settings → Variables and Secrets に `BASIC_AUTH_USER` / `BASIC_AUTH_PASS` として登録する。

## アナリティクス実装ルール

- GTM ID: `GTM-N3FWBNNW`（otta-lp-outing と共通。計測の切り分けは Looker Studio 側で URL フィルターを掛ける）
- `BaseLayout.astro` 内でランタイムのホスト名チェックにより発火を制御する。
- 発火するホスト: `www.otta.me`（本番）・`otta-me-stg.lolipop.io`（lolipopステージング）
- ローカル・`otta-free.konokoe.design`（Cloudflare staging）では発火しない。

## CSS 設計ルール

- スペーシング変数は必ず `clamp()` で定義する。固定値禁止。
- `--section-px`（水平パディング）: `clamp(1rem, 5vw, 2.5rem)`
- `--section-pt`（セクション間スペーシング）: `clamp(2rem, 5vw, 3rem)` ← セクション同士の間隔
- `--content-gap`（セクション内コンテンツ間スペーシング）: `clamp(1rem, 3vw, 1.5rem)` ← 見出し・テキスト・画像など要素間
- セクション間と要素間で同じ値を使わない。セクション間 > コンテンツ間 の階層を守る。
- セクションの上下余白は `padding-top: var(--section-pt)` のみ。`padding-bottom` は原則つけない。
- 色付き背景のセクション（G100・EDF4F1 等）は例外で `padding-bottom: var(--section-pt)` も保持する。
- テキストサイズは本文最低 `var(--fs-m)`。`--fs-xs` / `--fs-s` は注釈・補足のみ。
