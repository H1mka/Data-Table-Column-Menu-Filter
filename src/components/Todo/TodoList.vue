<template>
  <v-container>
    <todo-add-from />
    <v-row>
      <todo-list-item v-for="todo in progressTodos" :key="todo.id" :todo="todo" />
      <todo-list-item v-for="todo in doneTodos" :key="todo.id" :todo="todo" />
    </v-row>
  </v-container>
</template>

<script>
import TodoListItem from './TodoListItem.vue';
import TodoAddFrom from './TodoAddFrom.vue';

import { mapGetters } from 'vuex';
export default {
  components: {
    TodoListItem,
    TodoAddFrom,
  },
  computed: {
    ...mapGetters({
      doneTodos: 'todo/getDoneTodos',
      progressTodos: 'todo/getProgressTodos',
    }),
  },
};
</script>

<style></style>
