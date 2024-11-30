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
          <button v-if="isEditing" class="p-3 m-5 bg-sky-500 rounded-md c-white font-540 hover:p-3.7 hover:m-4.3" @click="updateArticle">{{ "保存" }}</button>
          <button class="p-3 m-5 bg-emerald-600 rounded-md c-white font-540 hover:p-3.7 hover:m-4.3" @click="editArticle">{{ isEditing ? "取消" : "编辑" }}</button>
          <button class="p-3 m-5 bg-rose-600 rounded-md c-white font-540 hover:p-3.7 hover:m-4.3" @click="isWillDelete=true;isModalOpen=true;">删除</button>
        </div>
      </div>
      <Categories v-if="fresh"/>
    </div>
    <div v-if="isModalOpen" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div class="px-2 py-1.5 rounded-xl c-black bg-green-600 ">
        <div class="px-20 py-6.5 rounded-lg bg-pink-100">
        请输入密码
        <input v-model="password" type="password" class="b-2 b-gray-300 rounded-md p-2 my-5 w-100">
        <div class="flex justify-end">
          <button @click="submit" class="bg-sky-500 c-white rounded-md p-2 mx-6 my-1 hover:p-3 hover:mx-5 hover:my-0">确定</button>
          <button @click="isModalOpen=false;isWillDelete=false;isWillEdit=false;" class="bg-gray-400 c-white rounded-md p-2 my-1 mx-1 hover:p-3 hover:mx-0 hover:my-0">取消</button>
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
  _id: string;
  title: string;
  content: string;
  categories: string[];
  created_at: string;
  updated_at: string;
}
const article = ref<ArticleData | null>(null)
const route = useRoute(); 
const router = useRouter();
onMounted(async () => {
  const id = route.params.id as string;
  const res = await $fetch(`/api/articles/${id}`) as { data: ArticleData};
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
const isModalOpen = ref(false);
const isWillEdit = ref(false);
const isWillDelete = ref(false);
function editArticle() {
  if(isEditing.value){
    isEditing.value = false;
    isWillEdit.value = false;
    return;
  }
  isWillEdit.value = true;
  isModalOpen.value = true;
}
const password = ref('');
const ans = import.meta.env.VITE_APP_PASSWORD;
const fresh = ref(true);
async function submit(){
  console.log(ans)
  if(password.value === ans){
    isModalOpen.value = false;
    if(isWillEdit.value){
      isEditing.value = true;
      isWillEdit.value = false;
    }else if(isWillDelete.value){
      await deleteArticle();
      isWillDelete.value = false;
    }
  }else{
    alert('密码错误')
  }
}
async function updateArticle() {
  if(article.value){
    article.value.updated_at = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    const res = await $fetch(`/api/articles`, {
      method: 'PUT',
      body: article.value
    })
    fresh.value = false;
    setTimeout(() => {
      fresh.value = true;
    }, 1);
  }	
  isEditing.value = false;
}
async function deleteArticle() {
  if(article.value){
      const res = await $fetch(`/api/articles/${article.value._id}`, {
      method: 'DELETE'
    }) as { data: null}
  }
  await router.push('/articles')
}



</script>

<style scoped>
/* 可以在这里添加样式 */
</style>
