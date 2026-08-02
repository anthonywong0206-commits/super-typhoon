# 超級颱風危機：極端氣候時代

高密度軍事科幻指揮中心風格的回合制災難策略網頁遊戲。玩家需要在不完整的颱風預測資料下，評估可能登陸位置、撤離沿岸城市、加固防衛並使用氣象武器降低傷亡。

## v0.2 高擬真視覺版本

本版本在原有 MVP 上重製主畫面及地圖系統：

- 按原概念圖重建 16:9 三欄式指揮中心介面
- 詳細東亞及西北太平洋海岸線底圖
- 城市按照真實經緯度投影，不再使用手動估算位置
- 18 個主要城市，包括香港、澳門、廣州、深圳、上海、台北、東京、首爾及馬尼拉
- 天文台式預測中心線、預測時間點、集合路徑及 70% 不確定範圍
- 實測路徑與預測路徑分開顯示
- 七級風及十級風半徑圈
- 多層衛星雲圖颱風、風眼、外圍雨帶、雷電及掃描動畫
- 颱風雲系大小、旋轉速度及雷電頻率按強度變化
- 回合推進時平滑插值顯示實時經緯度、風速及中心氣壓
- 海溫熱區及衛星／路徑／城市／風場圖層控制
- 原有撤離、防衛、補給、情報及五種氣象武器均可實際操作

## 遊戲規則

- 一場遊戲最多 16 回合，每回合代表 6 小時。
- 颱風會依照隱藏引導氣流、海溫、陸地及隨機擾動自行移動。
- 玩家只能看到帶誤差的預測資料，無法查看完整真實路線。
- 每回合使用有限行動點，進行城市撤離、防衛、補給或情報更新。
- 氣象武器需要消耗能源，並有成功率、冷卻時間及失敗副作用。

## 本機執行

```bash
npm install
npm run dev
```

瀏覽 `http://localhost:3000`。

直接開啟遊戲畫面進行視覺檢查：

```text
http://localhost:3000/?demo=1&seed=20870716
```

## 測試及建置

```bash
npm test
npm run build
```

Production 檔案會建立於 `dist/`。

## Vercel 部署

專案已包含 `vercel.json`：

- Framework Preset：Other
- Build Command：`npm run build`
- Output Directory：`dist`

把整個專案推送至 GitHub，再於 Vercel 匯入該 Repository 即可。若 Vercel 專案曾手動設定 Output Directory 為 `public`，請在 Project Settings 改回 `dist` 後重新部署。

## 主要檔案

```text
index.html       指揮中心及遊戲畫面
styles.css       UI、地圖、衛星颱風及動畫
app.js           UI、路徑繪製、互動及動畫控制
engine.js        Seed、颱風 AI、預測、城市、傷亡及評分
assets/          東亞底圖、衛星颱風雲圖及原概念參考
scripts/build.js Production build
vercel.json      Vercel 設定
```

## 技術說明

這是零外部執行依賴的 HTML／CSS／SVG／JavaScript 版本，可直接在 GitHub Pages 或 Vercel 部署。地圖海岸線是高精細視覺底圖，所有城市標記、預測路徑、風圈、數值、按鈕及遊戲狀態均由程式碼即時產生。
