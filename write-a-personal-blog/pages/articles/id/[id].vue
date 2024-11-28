<template>
  <div>
    <!-- 显示加载中的内容 -->
    <p v-if="!article">加载中...</p>
    <!-- 显示文章的标题和内容 -->
    <h1 v-if="article">{{ article.title }}</h1>
    <p v-if="article">{{ article.content }}</p>
  </div>
</template>

<script lang="ts" setup>
// 文章数据类型定义
interface ArticleData {
  _id: string;
  title: string;
  content: string;
  categories: string[];
  created_at: string;
  updated_at: string;
}

// 响应式变量，用来存储文章数据
const article = ref<ArticleData | null>(null)

const route = useRoute()  // 获取路由对象

onMounted(async () => {
  const id = route.params.id as string;  // 获取动态路由参数 id
  try {
    // 请求文章数据
    const res = await $fetch(`/api/articles/id/${id}`) as { data: ArticleData };
    article.value = res.data;  // 将获取到的文章数据存入响应式变量
  } catch (error) {
    console.error('加载文章失败', error);
  }
})
</script>

<style scoped>
/* 可以在这里添加样式 */
</style>
