<template>
  <div>
    <div class="bg-gray-100 px-4 pt-2 pb-4 w-5xl ml-50 mt-23 mb-6 rd-xl shadow-md" >
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
  </div>
</template>

<script lang="ts" setup>
//从父组件导入articles
defineProps(['articles'])
</script>

<style>

</style>