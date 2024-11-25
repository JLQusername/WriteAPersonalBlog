import { marked } from "marked";

// 自定义 marked 配置
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // 换行符自动转换为 <br>
});
  

export async function parseMarkdown(content: string): Promise<string> {
  const result = marked(content);
  return typeof result === "string" ? result : await result;
}
