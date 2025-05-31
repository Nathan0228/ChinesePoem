<template>
  <div class="poem-card">
    <p class="title">{{ poem.title }}</p>
    <p class="meta">{{ poem.dynasty }} · {{ poem.author }}</p>
    <pre class="content">{{ poem.content }}</pre>
  </div>
</template>

<script setup>
defineProps({ poem: Object })
</script>

<style scoped>
.poem-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.title {
  font-size: 1.2rem;
  font-weight: bold;
}
.meta {
  display: flex;
  align-items: right;
  font-size: 0.9rem;
  color: #888;
}
.content {
  white-space: pre-wrap;
  margin-top: 10px;
}
</style>
