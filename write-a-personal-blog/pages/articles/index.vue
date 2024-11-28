<template>
  <div class="bg-[url('/images/300.jpg')] h-screen w-screen ">
    <div class="flex justify-between">
      <div class="bg-gray-100 px-4 pt-3 w-5xl ml-50 mt-6 rounded shadow-md" >
          <div v-for="article in articles" :key="article._id" 
          class="bg-bluegray-300 mt-4 mb-1 p-2 rounded-xl b-4.5 border-gray-100 
           hover:border-lime-700 hover:p-4 hover:mb-2 hover:bg-sky-100">
           <router-link :to="'/articles/id/'+article._id">
            <p class="text-xl m-2 font-800">{{article.title}}</p>
            <p class="text-sm my-1 mx-2.2">{{article.categories.join(' / ')}}</p>
            <p class="text-sm my-1 mx-2.2 italic c-gray-600">{{article.updated_at}}</p>
           </router-link>
          </div>
      </div>
      <div class="bg-bluegray-200 px-4 pt-2 pb-3 mr-45 b-5 border-pink-300 mt-12 mb-2 rounded shadow-md">
          <p class="text-xl m-3 font-700 flex justify-center c-orange-600">分类</p>
          <div v-for="(category, index) in categories" :key="index" >
            <router-link :to="'/articles/category/'+ category">
              <div class="text-lg py-2.6 px-4 bg-sky-200 mx-2 my-3.5 c-rose font-600 rounded
              hover:border-lime-700 hover:p-4 hover:bg-green-300 hover:my-3">
                {{category}}
              </div>
            </router-link>
          </div>
      </div>  
    </div>
  </div>
</template>

<script setup lang="ts">
interface ArticleData {
    _id: string;
    title: string;
    categories: string[];
    updated_at: string;
}

const articles = ref<ArticleData[]>([])
const categories = ref<string[]>([])

onMounted(async () => {
    const res = await $fetch('/api/articles') as { data: ArticleData[] };
    articles.value = res.data.sort((a,b) => a.updated_at < b.updated_at ? 1 : -1);
    categories.value = [...new Set(res.data.flatMap(article => article.categories))]
})

</script>

<style>

</style>