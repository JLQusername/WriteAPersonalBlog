<template>
  <div class="bg-[url('/images/300.jpg')] h-screen w-screen">
    <div class="flex justify-between">
      <div class="bg-gray-100 px-5 pt-4 w-5xl ml-50 mt-6 rounded shadow-md">
        <h1 v-if="article" class="flex justify-center">{{ article.title }}</h1>
        <div v-html="renderedMarkdown" class="prose"></div>
      </div>
      <Categories />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MarkdownIt from 'markdown-it';
interface ArticleData {
  _id: string;
  title: string;
  content: string;
  categories: string[];
  created_at: string;
  updated_at: string;
}
const article = ref<ArticleData | null>(null)
const route = useRoute() 
onMounted(async () => {
  const id = route.params.id as string;
  const res = await $fetch(`/api/articles/id/${id}`) as { data: ArticleData };
  article.value = res.data; 
})
const md = new MarkdownIt();
const renderedMarkdown = computed(() => renderMarkdown(article.value ? article.value.content : ''));
function renderMarkdown(markdown: string) {
  return md.render(markdown);
}
</script>

<style scoped>
/* 可以在这里添加样式 */
</style>
