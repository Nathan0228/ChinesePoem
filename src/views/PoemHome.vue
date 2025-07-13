<template>
  <div class="container">
    <div class="search-section">
      <input
        type="text"
        v-model="searchText"
        placeholder="查询..."
      />
    </div>

    <h1>每日一诗</h1>
    <PoemCard v-if="dailyPoem" :poem="dailyPoem" :index="dailyIndex" />

    <h2 style="margin-top: 30px;">更多诗词</h2>
    <transition-group name="fade" tag="div" appear>
      <PoemCard
        v-for="(poem, i) in paginatedPoems"
        :key="poem.title + i"
        :poem="poem"
        :index="i"
        class="poem-item"
      />
    </transition-group>

    <!-- 分页按钮，仅在未搜索时显示 -->
    <div class="pagination" v-if="!searchText && totalPages > 1">
      <button :disabled="currentPage === 1" @click="prevPage">上一页</button>
      <span>第 {{ currentPage }} / {{ totalPages }} 页</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">下一页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import PoemCard from '@/components/poemCard.vue'

const poems = ref([])
const searchText = ref('')
const dailyPoem = ref(null)

const pageSize = 10
const currentPage = ref(1)

const filteredPoems = computed(() => {
  if (!searchText.value.trim()) return poems.value
  const keyword = searchText.value.toLowerCase()
  return poems.value.filter(poem =>
    poem.title.toLowerCase().includes(keyword) ||
    poem.author.toLowerCase().includes(keyword) ||
    poem.dynasty.toLowerCase().includes(keyword) ||
    poem.content.toLowerCase().includes(keyword)
  )
})

const totalPages = computed(() => Math.ceil(filteredPoems.value.length / pageSize))

const paginatedPoems = computed(() => {
  if (searchText.value.trim()) return filteredPoems.value
  const start = (currentPage.value - 1) * pageSize
  return filteredPoems.value.slice(start, start + pageSize)
})

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

watch(searchText, () => {
  currentPage.value = 1
})

onMounted(async () => {
  const res = await fetch('/poem/poem_shi.json')
  const data = await res.json()
  const dailyIndex = ref(0)
  poems.value = data

  const todayIndex = new Date().getDate() % poems.value.length
  dailyPoem.value = poems.value[todayIndex]
  dailyIndex.value = todayIndex
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 30px 20px;
}
.search-section {
  margin: 20px 0;
  text-align: center;
}
.search-section input {
  padding: 10px;
  width: 80%;
  max-width: 500px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.poem-item {
  animation: fadeInUp 0.7s ease both;
  margin-bottom: 16px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #888;
}

/* fade transition group name */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.pagination {
  text-align: center;
  margin: 30px 0;
}
.pagination button {
  padding: 8px 16px;
  margin: 0 10px;
  background-color: #42b983;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
