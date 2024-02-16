<template>
  <v-col cols="12">
    <v-card class="d-flex px-3">
      <v-checkbox label="" v-model="todo.isCompleted" />
      <v-card-title class="flex-grow-1" :class="{ completed: todo.isCompleted }">{{
        todo.title
      }}</v-card-title>
      <v-card-actions>
        <v-btn @click="deleteTodoItem(todo.id)">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations({
      deleteTodoItem: 'todo/deleteTodoItem',
    }),
  },
};
</script>

<style lang="scss" scoped>
.completed {
  text-decoration: line-through;
}
</style>
