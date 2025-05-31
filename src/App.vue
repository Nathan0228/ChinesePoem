<template>
  <div class="app">
    <header class="header">
      <h1>Chinese Poem Daily</h1>
    </header>
    <main class="wrapper_content">
      <router-view />
    </main>
    <footer>
      <hr />
      <p>©RigntCopy 2025 ChinesePoem</p>
    </footer>
  </div>
</template>

<script setup>
// 无需内容
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  border:0
}
body,html{
  margin: 0;
  padding: 0;
  border: 0;
}
#app{
  margin: 0;
}
.app {
  margin-left: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  background: #f7f7f7;
  /* 背景图片+遮罩 */
  background:
    linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.82)),
    url("/background/back1.png") no-repeat center center fixed;
  background-size: cover;
}
.wrapper_content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
header, footer {
   display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
