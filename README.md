# 超級颱風危機：極端氣候時代

可直接遊玩的回合制災難策略網頁遊戲 MVP。颱風會根據 Seed、海溫、引導方向及隨機擾動自行移動，玩家須在有限情報下部署城市撤離、防衛、補給及氣象武器。

## 已完成功能

- 四種難度模式與可重現 Seed
- 每回合代表六小時，有限行動點
- 自走颱風路線、強度、海溫及陸地削弱
- 預測路線、預測錐與隱藏實際路線
- 13 個東亞沿岸城市
- 撤離、防衛、補給及情報更新
- 五種氣象武器、成功率、能源與冷卻
- 多層颱風動畫、雷電、掃描線及平滑移動
- 城市傷亡、基建損失、評分與結算
- LocalStorage 自動存檔及繼續遊戲
- GitHub／Vercel 零依賴部署

## 本機執行

```bash
npm run dev
```

然後瀏覽 `http://localhost:3000`。

## 測試與 Build

```bash
npm test
npm run build
```

Build 會輸出至 `dist/`。

## GitHub

```bash
git init
git add .
git commit -m "Initial playable Super Typhoon Crisis MVP"
git branch -M main
git remote add origin https://github.com/<username>/super-typhoon-crisis.git
git push -u origin main
```

## Vercel

在 Vercel 匯入 GitHub Repository。Framework Preset 選擇 **Other**，Build Command 填寫 `npm run build`，Output Directory 填寫 `dist`。不需要任何環境變數。

## 已知限制

目前使用遊戲化 SVG 東亞地圖，而非完整 GIS 海岸線；氣象模型只供遊戲用途，不代表真實氣象預報。下一階段可遷移至 Next.js、MapLibre 及高精度 GeoJSON。
