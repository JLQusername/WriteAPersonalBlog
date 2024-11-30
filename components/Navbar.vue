<template>
  <nav class="bg-gradient-to-r from-green-400 via-cyan-500 to-sky-600 p-4 flex justify-between items-center fixed w-full top-0">
    <span class="text-6 c-sky-900 font-bold italic ml-5">花果茶的个人博客</span>
    <div class=" flex items-center">
      <router-link to="/" 
      :class="{ 'opted ': $route.path === '/'}"
      class="mr-2 opt
      ">首页</router-link>
      <router-link to="/articles" 
        :class="{ 'opted': $route.path === '/articles' }"
        class="mx-2 opt
      ">文章列表</router-link>
      <router-link to="/create"
        :class="{ 'opted': $route.path === '/create' }"
        class="mx-2 opt
      ">发布文章</router-link>
      <div>
        <input type="text" v-model="searchQuery" placeholder="搜索..." @input="search" class="ml-2 mr-1.5 p-1 b-2 rounded"/>
        <ul v-if="searchQuery.length > 0 && filteredSuggestions.length > 0" class="absolute left-0 mt-1 ml-340 mr-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <li v-for="(sug,index) in filteredSuggestions" :key="index" @click="searchQuery = sug" class="cursor-pointer p-2 hover:bg-gray-200">{{ sug }}</li>
        </ul>
      </div>
      <button @click="searchArticles" class="mr-3 bg-rose-500 text-white p-1.2 rounded b-2 border-transparent hover:border-current">点我搜索🔍️</button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const searchQuery = ref('');
const filteredSuggestions = ref<string[]>([]);
// 搜索函数
async function search() {
  const res = await $fetch(`/api/articles/suggestions?query=${searchQuery.value}`);
  filteredSuggestions.value = res.data as string[];
}

const router = useRouter();
async function searchArticles() {
  await router.push(`/articles/query/${searchQuery.value}`)
}
</script>

<style scoped>
/* 你可以根据需求调整样式 */
</style>
