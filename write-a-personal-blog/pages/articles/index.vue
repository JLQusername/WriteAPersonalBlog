<template>
  <div class="flex justify-between">
    <div bg-bluegray-200 px-4 py-2 w-5xl ml-50 my-3>
        <div v-for="article in articles" :key="article._id" class="bg-bluegray-400 my-2 p-2 rounded">
        <p text-xl m-1>{{article.title}}</p>
        <p text-sm m-1>{{article.categories.join(' / ')}}</p>
        <p text-sm m-1>{{article.updated_at}}</p>
    </div>
    </div>
    <div class="bg-bluegray-300 m-3 px-4 py-2 mr-45 b-3">
        <div v-for="(categorie, index) in categories" :key="index" >
          <p text-lg m-1>{{categorie}}</p>
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
    articles.value = res.data;
    categories.value = [...new Set(res.data.flatMap(article => article.categories))]
})

</script>

<style>

</style>