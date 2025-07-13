<template>
  <div class="poem-card" @click="handleClick">
    <p class="title">{{ poem.title }}</p>
    <p class="meta">{{ poem.dynasty }} · {{ poem.author }}</p>
    <pre class="content">{{ poem.content }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  poem: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
const handleClick = () =>{
  if(props.index !== undefined){
    router.push(`/poem/${props.index}`)
  }
 }
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
  font-size: 0.9rem;
  color: #888;
}
pre{
  font-size: 1.0rem;
  font-weight: normal;
  color:black;
}
.content {
  white-space: pre-wrap;
  margin-top: 10px;
}
</style>
