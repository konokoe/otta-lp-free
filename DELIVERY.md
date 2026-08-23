# 納品ファイル管理

## 命名規則

```
senior-free_v{通し番号}_{YYYYMMDD}.zip
```

- 通し番号は納品のたびに +1（日付が同じでも別番号）
- 日付は zip を作成した日
- 中身は `senior-free/` フォルダ1つ。クライアントは `/lp/` 配下に展開して `/lp/senior-free/` になる

## 作成手順

```bash
git checkout main
git merge --ff-only dev
npm run build
# dist/ の中身を senior-free/ に入れて zip 化
git checkout dev && npm run build   # dev の dist を戻す
```

## 納品履歴

| バージョン | 日付 | main の HEAD | 内容 |
|---|---|---|---|
| v1 | 2026-08-23 | `a14c917` | 初回納品。月額0円訴求のLPとして FV を差し替え、セクション構成を整理（Concerns / AppFeatures / CtaFirst を削除、Product は比較表のみ、Voices はメディア掲載のみ）。セクション順を FV → Pricing → Points → Product → Network → CtaMid → Flow → Voices → FAQ に変更。FAQ を5件に整理。ナビにクリック計測属性（`js-nav` / `data-nav-*`）を付与。タイトル・ディスクリプションを刷新 |
