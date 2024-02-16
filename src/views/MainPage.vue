<template>
  <v-container>
    <div class="text-h3">Main</div>
    <!-- <MainTabs /> -->
    <todo-list />
  </v-container>
</template>

<script>
import TodoList from '@/components/Todo/TodoList.vue';
// import MainTabs from '@/components/MainTabs.vue';

export default {
  components: {
    TodoList,
  },
};
</script>

<style></style>
