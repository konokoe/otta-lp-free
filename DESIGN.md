# LP 設計ドキュメント

## 技術スタック
- Astro（静的）+ Tailwind CSS v4 + Swiper
- max-width: 768px・中央配置
- 単位: rem / % / clamp()
- スクロールアニメーション: 後工程で実装（現在はなし）

---

## カラートークン（global.css CSS変数）

### Brand
| 変数 | 値 |
|---|---|
| `--c-yellow` | `#D5B95E` |
| `--c-red` | `#BF4D4D` |
| `--c-green` | `#80B6A0` |
| `--c-blue` | `#5E87BE` |
| `--c-dark` | `#2C4C75` |

### Gray scale
| 変数 | 値 |
|---|---|
| `--c-g-000` | `#FFFFFF` |
| `--c-g-100` | `#F6F5F3` |
| `--c-g-200` | `#EBEAE5` |
| `--c-g-300` | `#DBD8D1` |
| `--c-g-400` | `#AFA99C` |
| `--c-g-500` | `#80796B` |
| `--c-g-600` | `#635B4B` |
| `--c-g-700` | `#514837` |
| `--c-g-800` | `#372F1F` |
| `--c-g-900` | `#271D11` |
| `--c-g-1000` | `#000000` |

### Text
| 変数 | 値 |
|---|---|
| `--c-text` | `#3E2A25` |
| `--c-text-muted` | `#897E70` |

---

## タイポグラフィ（clamp ベース）

フォント: Montserrat（英数）/ Noto Sans JP（日本語）
line-height / letter-spacing は typo.png に準拠。

**英数字の letter-spacing は外す。** 日本語向けの字間（`html` の `0.04em` や各所の `0.05〜0.2em`）を英数字に継承させず、Montserrat 本来の字間で組む。

- 英数字のみの要素: その要素に `letter-spacing: normal` を指定
- 日本語に混ざる英数字: `global.css` の `.en` で包む
  - マークアップ直書き: `<span class="en">Amazon</span>`
  - データ配列由来のテキスト: `src/lib/en.ts` の `en()` を通す（`<p set:html={en(text)} />`）

| トークン | clamp 値 | line-height | letter-spacing |
|---|---|---|---|
| `--fs-h1` | `clamp(1.75rem, 5vw, 2.25rem)` | 1.35 | 0.02em |
| `--fs-h2` | `clamp(1.375rem, 4vw, 1.75rem)` | 1.35 | 0.05em |
| `--fs-h3` | `clamp(1.125rem, 3vw, 1.375rem)` | 1.5 | 0.05em |
| `--fs-h4` | `clamp(1rem, 2.5vw, 1.125rem)` | 1.5 | 0.05em |
| `--fs-xl` | `clamp(1rem, 2.5vw, 1.125rem)` | 1.75 | 0.04em |
| `--fs-l` | `clamp(0.9375rem, 2.2vw, 1rem)` | 1.75 | 0.04em |
| `--fs-m` | `clamp(0.875rem, 2vw, 0.9375rem)` | 1.75 | 0.04em |
| `--fs-s` | `clamp(0.75rem, 1.8vw, 0.875rem)` | 1.75 | 0.04em |
| `--fs-xs` | `clamp(0.6875rem, 1.5vw, 0.75rem)` | 1.75 | 0.04em |

---

## コンポーネント構成

```
src/
├── layouts/
│   └── BaseLayout.astro
├── styles/
│   └── global.css           # トークン定義 + ベーススタイル
├── components/
│   ├── ui/
│   │   ├── Heading.astro    # セクション見出し（日本語 + 英語サブ）
│   │   ├── Button.astro     # CTAボタン（variant: primary / outline）
│   │   ├── Badge.astro      # バッジ・ラベル
│   │   └── CampaignBanner.astro  # キャンペーン帯（FV/CtaMid/CtaFirst共通）
│   ├── Header.astro         # 固定ヘッダー（ロゴ + 特許バッジ + メニューボタン）
│   ├── HeaderMenu.astro     # スライドインメニュー（オーバーレイ）
│   ├── FV.astro             # ファーストビュー（Swiper カード型）
│   ├── Concerns.astro       # こんなお悩みありませんか？
│   ├── Product.astro        # otta.a 製品紹介・比較表
│   ├── Network.astro        # 見守りネットワーク
│   ├── Points.astro         # 5つのポイント（Swiper + モーダル）
│   ├── Pricing.astro        # 料金プラン
│   ├── CtaMid.astro         # 中間CTA
│   ├── Flow.astro           # サービス利用の流れ（カルーセル）
│   ├── Voices.astro         # ご利用者の声 + メディア掲載
│   ├── AppFeatures.astro    # アプリでできること（カルーセル）
│   ├── CtaFirst.astro       # 初回購入限定CTA
│   ├── FAQ.astro            # よくある質問（アコーディオン）
│   └── Footer.astro
└── pages/
    └── index.astro
```

---

## Swiper 使用箇所

| コンポーネント | タイプ | 備考 |
|---|---|---|
| FV | カード型（effect: cards or fade） | 3枚・人物写真 |
| Points | カルーセル | 5枚・モーダル連動 |
| Flow | カルーセル | 4枚・STEPカード |
| Voices | カルーセル | 複数・ユーザーの声 |
| AppFeatures | カルーセル | 複数・アプリ画面 |

---

## モーダル仕様（Points.astro）

- トリガー: 各ポイントカードの「詳細を見る +」ボタン
- 開閉: `opacity` + `visibility` による fade（transition: 0.25s）
- 構造: オーバーレイ背景 + コンテンツパネル（画像・タイトル・説明・閉じるボタン）
- 閉じる方法: 「閉じる ×」ボタン or オーバーレイクリック

```css
.modal {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s, visibility 0.25s;
}
.modal.is-open {
  opacity: 1;
  visibility: visible;
}
```

---

## ヘッダーメニュー仕様

- 固定ヘッダー右の丸ボタン（menu）クリックで開閉
- メニュー内: otta logo + close ボタン + 購入CTAカード + セクションリンク一覧
- 背景: `--c-green` (#80B6A0)
- 閉じる: close ボタン or リンククリック

---

## キャンペーンバナー共通仕様（CampaignBanner.astro）

FV・CtaMid・CtaFirst の3箇所で共通使用。
props で文言・日付・ベネフィット内容を差し込む想定。

内容:
1. 購入条件テキスト（「シニア見守り端末 otta.a 5,500円（税込み）を購入すると」）
2. ベネフィット2列（契約事務手数料 3,000円OFF / プラン 1ヶ月無料）
3. 送料無料バナー（8/31まで）
4. CTAボタン2種（公式ショップで購入する / Amazonで購入する）
5. 注釈（※公式ショップサイトに遷移します / ※Amazonのサイトに遷移します）

---

## 画像・リンク

- 画像: すべてダミー（背景色プレースホルダー）で実装・後から差し替え
- リンク: すべて `href="#"` のダミー
- FV キャンペーン日付: 8月31日

---

## 実装順序

1. `global.css` トークン定義
2. `ui/` 共通パーツ（Heading / Button / Badge / CampaignBanner）
3. `Header` + `HeaderMenu`
4. `FV`
5. `Concerns` → `Product` → `Network` → `Points`
6. `Pricing` → `CtaMid` → `Flow` → `Voices`
7. `AppFeatures` → `CtaFirst` → `FAQ` → `Footer`
8. `index.astro` 組み上げ
