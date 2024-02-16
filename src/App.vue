<template>
  <!-- fluid - на всю ширину экрана -->
  <v-app>
    <navbar />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
