const state = {
  todoList: [
    { id: 1, title: 'todo 1', isCompleted: true },
    { id: 2, title: 'todo 2', isCompleted: false },
    { id: 3, title: 'todo 3', isCompleted: false },
    { id: 4, title: 'todo 4', isCompleted: true },
  ],
};

const mutations = {
  setTodoList(state, payload) {
    state.todoList = payload;
  },
  deleteTodoItem(state, payload) {
    state.todoList = state.todoList.filter((item) => item.id !== payload);
  },
  addTodoItem(state, payload) {
    state.todoList.push(payload);
  },
};

const actions = {};

const getters = {
  getAllTodos: (state) => state.todoList,
  getDoneTodos: (state) => state.todoList.filter((todo) => todo.isCompleted),
  getProgressTodos: (state) => state.todoList.filter((todo) => !todo.isCompleted),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
