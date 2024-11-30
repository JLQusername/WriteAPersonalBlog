<template>
  <div class="bg-[url('/images/300.jpg')] h-screen w-screen ">
    <div class="flex justify-between">
      <Articles :articles="articles" />
      <Categories />
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
const route = useRoute() 
onMounted(async () => {
  const category = route.params.category as string;
  const res = await $fetch(`/api/articles?category=${category}`) as { data: ArticleData[] };
  articles.value = res.data.sort((a,b) => a.updated_at < b.updated_at ? 1 : -1);
})
</script>

<style>

</style>