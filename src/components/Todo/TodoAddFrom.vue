<template>
  <v-container>
    <v-text-field
      class="mb-2"
      v-model="title"
      :focused="true"
      label="New Todo"
      clearable
      @keyup.enter="addTodo"
    ></v-text-field>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data: () => ({
    title: '',
  }),
  methods: {
    ...mapMutations({
      addTodoItem: 'todo/addTodoItem',
    }),
    addTodo() {
      const todo = {
        id: new Date().toString(),
        title: this.title,
        isCompleted: false,
      };
      this.title = '';
      this.$store.commit('todo/addTodoItem', todo);
    },
  },
};
</script>

<style></style>
