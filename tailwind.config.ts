import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink:              "#0d0600",   // 浓墨，近黑
        "ink-light":      "#3d2b1f",   // 淡墨，深棕
        "ink-muted":      "#7a5c4a",   // 次要文字
        vermilion:        "#9b2335",   // 故宫红（比朱砂更沉）
        "vermilion-dark": "#6e1826",   // hover
        gold:             "#9a7d3a",   // 哑金，不刺眼
        "gold-light":     "#c9a84c",   // 描边高光
        parchment:        "#ede0c4",   // 宣纸，偏冷米黄
        "parchment-mid":  "#e0ceaa",   // 卡片底
        "parchment-dark": "#cdb98a",   // 深一档，分割线
        "scroll-border":  "#7a6030",   // 卷轴边框
        jade:             "#3d6b5e",   // 玉色，点缀
      },
      boxShadow: {
        card: "0 2px 16px rgba(13, 6, 0, 0.10), inset 0 1px 0 rgba(201,168,76,0.18)"
      },
      fontFamily: {
        title: ["'ZCOOL XiaoWei'", "serif"],
        sans:  ["'Noto Serif SC'", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
