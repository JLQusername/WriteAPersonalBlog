<template>
  <div class="bg-[url('/images/300.jpg')] w-screen flex justify-center items-center">
    <div class="bg-gray-100 px-5 pt-4 w-5xl mt-30 rounded shadow-md" :class="isPreviewing ? 'mb-170' : 'mb-100'">
      <div v-if="isPreviewing"  class="mb-5 mx-5">
        <p class="font-600 flex justify-center items-center text-4xl m-4 ">{{ article.title }}</p>
        <p class="font-400 flex justify-center text-sm m-1.5 c-gray-600">文章分类：{{article.categories.join(' ')}}</p>
        <div v-html="renderedMarkdown" class="prose"></div>
      </div>
      <div v-else> 请输入文章标题 
        <input v-model="article.title" type="text" class="border-2 border-gray-300 rounded-md p-2 m-5 w-4/5">
        <div>请输入文章分类
          <input class="border-2 border-gray-300 rounded-md p-2 m-5 w-1/5" v-model="article.categories[0]">
          <input class="border-2 border-gray-300 rounded-md p-2 m-5 w-1/5" v-model="article.categories[1]">
          <input class="border-2 border-gray-300 rounded-md p-2 m-5 w-1/5" v-model="article.categories[2]">
        </div>
        <div class="flex">
          <div class="pt-8">请输入文章内容</div>
          <textarea v-model="article.content" class="border-2 border-gray-300 rounded-md p-2 m-5 w-4/5 h-96"></textarea>
        </div>
      </div>
      <div class="flex justify-end">
        <button class="p-3 m-5 bg-sky-500 rounded-md c-white font-540 hover:p-3.7 hover:m-4.3" @click="submitArticle">{{ "保存" }}</button>
        <button class="p-3 m-5 bg-gray-500 rounded-md c-white font-540 hover:p-3.7 hover:m-4.3" @click="isPreviewing = !isPreviewing">{{ isPreviewing ? "取消预览" : "预览" }}</button>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div class="px-2 py-1.5 rounded-xl c-black bg-green-600 ">
        <div class="px-20 py-6.5 rounded-lg bg-pink-100">
        请输入密码
        <input v-model="password" type="password" class="b-2 b-gray-300 rounded-md p-2 my-5 w-100">
        <div class="flex justify-end">
          <button @click="submit" class="bg-sky-500 c-white rounded-md p-2 mx-6 my-1 hover:p-3 hover:mx-5 hover:my-0">确定</button>
          <button @click="router.push('/articles')" class="bg-gray-400 c-white rounded-md p-2 my-1 mx-1 hover:p-3 hover:mx-0 hover:my-0">取消</button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
interface ArticleData {
  title: string;
  content: string;
  categories: string[];
}
const article = ref<ArticleData>({title:'', content:'', categories:["默认"]});
const router = useRouter();
const md = new MarkdownIt();
const renderedMarkdown = computed(() => renderMarkdown(article.value ? article.value.content : ''));
function renderMarkdown(markdown: string) {
  if (!markdown) return '';
  const rawHtml = md.render(markdown);
  return DOMPurify.sanitize(rawHtml);
}
const isModalOpen = ref(true);
const isPreviewing = ref(false);

const password = ref('');
const ans = import.meta.env.VITE_APP_PASSWORD;
async function submit(){
  if(password.value === ans){
    isModalOpen.value = false;
  }else{
    alert('密码错误')
  }
}
async function submitArticle() {
  const res = await $fetch(`/api/articles`, {
    method: 'POST',
    body: article.value
  })
  await router.push('/articles')
}

</script>

<style scoped>
/* 可以在这里添加样式 */
</style>