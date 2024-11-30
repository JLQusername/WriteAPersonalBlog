<template>
  <div class="bg-[url('/images/300.jpg')] w-screen">
    <div class="flex justify-between ">
      <div class="bg-gray-100 px-5 pt-4 w-5xl ml-50 mt-6 rounded shadow-md mb-150">
        <div v-if="article" class="">
          <p class="font-600 flex justify-center text-4xl m-4 ">{{ article.title }}</p>
          <p class="font-400 flex justify-center text-sm m-1.5 c-gray-600">文章分类：{{article.categories.join(' ')}}</p>
          <p class="font-400 flex justify-center text-sm m-1.5 c-gray-600">创建于：{{article.created_at}}</p>
          <p class="font-400 flex justify-center text-sm m-1.5 c-gray-600">编辑时间：{{article.updated_at}}</p>
        </div>
        <div v-if="!isEditing" v-html="renderedMarkdown" class="prose mb-5 mx-5"></div>
        <div v-else-if="article">
          请修改文章标题<input v-model="article.title" type="text" class="border-2 border-gray-300 rounded-md p-2 m-5 w-4/5">
          <div>请修改文章分类
            <input class="border-2 border-gray-300 rounded-md p-2 m-5 w-1/5" v-model="article.categories[0]">
            <input class="border-2 border-gray-300 rounded-md p-2 m-5 w-1/5" v-model="article.categories[1]">
            <input class="border-2 border-gray-300 rounded-md p-2 m-5 w-1/5" v-model="article.categories[2]">
          </div>
          <div class="flex">
            <div class="pt-8">请修改文章内容</div>
            <textarea v-model="article.content" class="border-2 border-gray-300 rounded-md p-2 m-5 w-4/5 h-96"></textarea>
          </div>
        </div>
        <div class="flex justify-end">
          <button v-if="isEditing" p-3 m-5 bg-sky-500 rounded-md c-white font-540 hover:p-3.7 hover:m-4.3 @click="keepArticle">{{ "保存" }}</button>
          <button p-3 m-5 bg-emerald-600 rounded-md c-white font-540 hover:p-3.7 hover:m-4.3 @click="updateArticle">{{ isEditing ? "取消" : "编辑" }}</button>
          <button p-3 m-5 bg-rose-600 rounded-md c-white font-540 hover:p-3.7 hover:m-4.3>删除</button>
        </div>
      </div>
      <Categories />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
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
  const res = await $fetch(`/api/articles/${id}`) as { data: ArticleData };
  article.value = res.data; 
})
const md = new MarkdownIt();
const renderedMarkdown = computed(() => renderMarkdown(article.value ? article.value.content : ''));
function renderMarkdown(markdown: string) {
  if (!markdown) return '';
  const rawHtml = md.render(markdown);
  return DOMPurify.sanitize(rawHtml);
}
const isEditing = ref(false);
function updateArticle() {
  isEditing.value = !isEditing.value;
  // 在这里处理更新文章的逻辑
}
function keepArticle() {
  isEditing.value = false;
  console.log(article.value);
}
</script>

<style scoped>
/* 可以在这里添加样式 */
</style>
