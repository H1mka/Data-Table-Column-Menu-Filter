import axios from 'axios';

const photosModule = {
  state: {
    photos: [],
    dialogVisible: false,
    currentPhoto: {},
    isLoading: false,
    page: 1,
    limit: 10,
  },
  mutations: {
    setPhotos(state, payload) {
      state.photos = payload;
    },
    loadNewPhotosPage(state, payload) {
      state.photos = [...state.photos, ...payload];
    },
    addNewPhoto(state, payload) {
      state.photos.push(payload);
    },
    setCurrentPhoto(state, payload) {
      state.currentPhoto = payload;
    },

    showDialog(state) {
      state.dialogVisible = true;
    },
    hideDialog(state) {
      state.dialogVisible = false;
    },

    setIsLoading(state, payload) {
      state.isLoading = payload;
    },

    incrementPage(state) {
      state.page += 1;
    },
  },
  actions: {
    async fetchPhotos({ state, commit }) {
      try {
        commit('setIsLoading', true);

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/photos?_limit=${state.limit}&_page=${state.page}`
        );
        commit('setPhotos', response.data);
      } catch (error) {
        console.log(error);
      } finally {
        commit('setIsLoading', false);
      }
    },
    async loadMorePhotos({ state, commit }) {
      try {
        commit('setIsLoading', true);

        setTimeout(async () => {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/photos?_limit=${state.limit}&_page=${state.page}`
          );

          commit('loadNewPhotosPage', response.data);
          commit('incrementPage');
          commit('setIsLoading', false);
        }, 3000);
      } catch (error) {
        console.log(error);
      } finally {
        // commit('setIsLoading', false);
      }
    },
  },
  getters: {
    getAllPhotos: (state) => state.photos,
    getDialogVisible: (state) => state.dialogVisible,
    getCurrentPhoto: (state) => state.currentPhoto,
    getIsLoading: (state) => state.isLoading,
  },
  namespaced: true,
};

export default photosModule;
