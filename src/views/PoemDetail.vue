<template>
  <div class="container" v-if="poem">
    <h1>{{ poem.title }}</h1>
    <p class="meta">{{ poem.dynasty }} · {{ poem.author }}</p>
    <pre v-if="!showWrite || showOrigin" class="content">{{ poem.content }}</pre>
    <div class="function-container">
      <button class="write-btn" @click="handleWrite" v-if="!showWrite">我要默写</button>
      <button class="origin-btn" v-if="showWrite" @click="showOrigin = !showOrigin">{{ showOrigin ? '隐藏原文' : '显示原文' }}</button>
    </div>
    <transition name="fade">
      <div v-if="showWrite" class="write-container">
        <h2>默写区</h2>
        <textarea v-model="userInput" rows="8" class="write-textarea" placeholder="请在此默写古诗..." />
        <button class="check-btn" @click="checkWrite">检查</button>
        <div v-if="checkResult" class="result-container">
          <div v-for="(msg, i) in checkResult" :key="i" :class="{'success': msg === '全部正确！', 'error': msg !== '全部正确！'}">{{ msg }}</div>
        </div>
      </div>
    </transition>
  </div>
  <div v-else class="container loading">加载中...</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const poemId = route.params.index;
const poem = ref(null);

const showWrite = ref(false);
const showOrigin = ref(false);
const userInput = ref('');
const checkResult = ref(null);

const handleWrite = () => {
  showWrite.value = true;
  userInput.value = '';
  checkResult.value = null;
  showOrigin.value = false;
};

// 去除所有中英文标点的辅助函数
function removePunctuation(str) {
  // 去除常见中英文标点和空白
  return str.replace(/[\s，。！？、；：“”‘’（）《》【】\[\]{}\-_,.?!:;"'()<>]/g, '');
}

const checkWrite = () => {
  if (!poem.value) return;
  const poemLines = poem.value.content.replace(/。/g, '。\n').split('\n').map(l => l.trim()).filter(l => l);
  const userLines = userInput.value.split('\n').map(l => l.trim());
  const result = [];
  for (let i = 0; i < poemLines.length; i++) {
    // 忽略标点和空格
    const std = removePunctuation(poemLines[i]);
    const usr = removePunctuation(userLines[i] || '');
    if (usr !== std) {
      result.push(`第${i + 1}行错误：应为「${poemLines[i]}」`);
    }
  }
  if (result.length === 0) {
    result.push('全部正确！');
  }
  checkResult.value = result;
};

onMounted(async () => {
  const res = await fetch('/poem/poem_shi.json');
  const data = await res.json();
  const idx = Number(poemId);
  if (!isNaN(idx) && data[idx]) {
    poem.value = data[idx];
  }
});
</script>

<style scoped>
.container {
  max-width: 700px;
  min-height: 100vh;
  margin: 40px auto 0 auto;
  padding: 32px 24px 24px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.loading {
  text-align: center;
  color: #888;
  font-size: 1.2rem;
}
h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  letter-spacing: 2px;
  text-align: center;
}
.meta {
  font-size: 1.1rem;
  color: #888;
  margin-bottom: 18px;
  text-align: center;
}
.content {
  white-space: pre-wrap;
  font-size: 1.15rem;
  margin-top: 10px;
  color: #222;
  border-radius: 8px;
  padding: 18px 16px;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
}
.function-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 24px 0 0 0;
  gap: 16px;
}
.write-btn, .check-btn, .origin-btn {
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 22px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.write-btn:hover, .check-btn:hover, .origin-btn:hover {
  background: #36996b;
}
.write-container {
  margin-top: 40px;
  width: 100%;
  max-width: 600px;
  background: #f6f7fa;
  border-radius: 10px;
  padding: 24px 18px 18px 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.write-container h2 {
  margin-bottom: 12px;
  color: #333;
  font-size: 1.2rem;
}
.write-textarea {
  width: 100%;
  min-height: 120px;
  font-size: 1.1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 16px;
  resize: vertical;
  background: #fff;
  box-sizing: border-box;
}
.result-container {
  margin-top: 10px;
  width: 100%;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.result-container .error, .result-container .success {
  font-size: 1.1rem;
}
.result-container .error {
  color: #e74c3c;
  margin-bottom: 4px;
}
.result-container .success {
  color: #42b983;
  font-weight: bold;
  margin-bottom: 4px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
@media (max-width: 600px) {
  .container {
    padding: 12px 2vw 12px 2vw;
    border-radius: 0;
    box-shadow: none;
  }
  .write-container {
    max-width: 98vw;
    padding: 12px 2vw 12px 2vw;
  }
  .content, .write-textarea {
    font-size: 1rem;
    padding: 8px 4px;
  }
}
</style>
