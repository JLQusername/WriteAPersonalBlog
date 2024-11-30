<template>
  <div>
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
</template>

<script lang="ts" setup>
const categories = ref<string[]>([])
onMounted(async () => {
    const res = await $fetch('/api/articles') as { data:{ categories: string[] }[] };
    categories.value = [...new Set(res.data.flatMap(article => article.categories))]
})
</script>

<style>

</style>