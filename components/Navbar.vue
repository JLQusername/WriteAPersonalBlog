<template>
  <nav class="bg-gradient-to-r from-green-400 via-cyan-500 to-sky-600 p-4 flex justify-between items-center">
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
      <input
        type="text" 
        v-model="searchQuery" 
        placeholder="搜索..." 
        @input="search"
        class="ml-2 mr-1.5 p-1 b-2 rounded"
      />
      <button @click="searchArticles" class="mr-3 bg-rose-500 text-white p-1.2 rounded b-2 border-transparent hover:border-current">点我搜索🔍️</button>
    </div>
  </nav>
</template>
  
<script setup lang="ts">
const searchQuery = ref('');
function search() {
  console.log('搜索内容:', searchQuery.value);
}
function searchArticles() {
  console.log('搜索内容:', searchQuery.value);
}
</script>
  
<style scoped>

</style>
  