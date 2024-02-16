<template>
  <!-- fluid - на всю ширину экрана -->
  <v-container fluid class="pa-0" tag="header">
    <v-app-bar
      color="orange"
      scroll-behavior="fade-image"
      scroll-threshold="1000"
      image="https://picsum.photos/1920/1080?random"
    >
      <div class="text-h4">App bar</div>
      <v-spacer />
      <v-btn outlined class="ml-3">
        <router-link to="/">Главная</router-link>
      </v-btn>
      <v-btn outlined class="ml-3">
        <router-link to="/gallery">Галерея</router-link>
      </v-btn>
      <v-btn outlined class="ml-3">
        <router-link to="/table-filter">Фильтр 1</router-link>
      </v-btn>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87) !important;
}
</style>
