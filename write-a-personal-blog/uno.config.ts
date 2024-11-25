import { options } from 'marked'
import {
  defineConfig,  // 用于定义 UnoCSS 配置
  presetAttributify,  // 属性化类名预设
  presetIcons,  // 图标预设
  presetTypography,  // 排版预设
  presetUno,  // UnoCSS 默认预设
  presetWebFonts,  // Web 字体预设
  transformerDirectives,  // 指令转换器
  transformerVariantGroup  // 变体组转换器
} from 'unocss'
  
export default defineConfig({
  shortcuts: [
    // 用于定义自定义的快捷方式，简化类名
    // 例如: 'btn': 'px-4 py-2 bg-blue-500 text-white rounded-lg'
    {
      'opt': 'text-emerald-900 no-underline p-2 rounded hover:text-pink-500 bg-green-500 active:text-amber-600' ,
      'opted':'font-bold b-3 !text-pink-500'
    }
  ],
  theme: {
    colors: {
      // 自定义主题颜色
      // 例如: primary: '#FF6347'
    }
  },
  presets: [
    presetUno(),  // 默认预设，提供 UnoCSS 基本的类名系统
    presetAttributify(),  // 属性化类名，允许通过 HTML 属性来定义样式
    presetIcons(),  // 提供图标支持，便于使用图标字体或 SVG 图标
    presetTypography(),  // 排版预设，优化文本排版样式
    presetWebFonts({
      fonts: {
        // 配置 Web 字体，可以通过配置文件引入 Google Fonts 等
      },
    }),
  ],
  transformers: [
    transformerDirectives(),  // 处理 CSS 指令（如 `@apply`、`@layer` 等）
    transformerVariantGroup(),  // 处理变体组（如 `hover`、`focus` 等）
  ],
})