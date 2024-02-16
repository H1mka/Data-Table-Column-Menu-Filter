<template>
  <v-container>
    <PhotoForm @addPhoto="addNewPhoto" />

    <v-row v-if="photos.length > 0">
      <Photo v-for="photo in photos" :key="photo.id" :photo="photo" @openPhoto="openPhoto" />
    </v-row>

    <v-row class="justify-center my-10" v-if="isLoading">
      <v-progress-circular indeterminate color="green"></v-progress-circular>
    </v-row>

    <PhotoDialog />
    <div ref="observer" class="observer"></div>
  </v-container>
</template>

<script>
import Photo from '@/components/Photo/Photo.vue';
import PhotoForm from '@/components/Photo/PhotoForm.vue';
import PhotoDialog from '@/components/Photo/PhotoDialog.vue';

import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  components: {
    Photo,
    PhotoForm,
    PhotoDialog,
  },
  mounted() {
    // this.fetchPhotosData();

    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };

    const callback = (entries, observer) => {
      console.log(this.isLoading);
      if (entries[0].isIntersecting && !this.isLoading) {
        this.loadMorePhotos();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  methods: {
    ...mapActions({
      fetchPhotosData: 'photos/fetchPhotos',
      loadMorePhotos: 'photos/loadMorePhotos',
    }),
    ...mapMutations({
      addNewPhoto: 'photos/addNewPhoto',
    }),

    openPhoto(photo) {
      this.$store.commit('photos/setCurrentPhoto', photo);
      this.$store.commit('photos/showDialog');
    },
  },
  computed: {
    // Хорошая практика обращаться к состоянию через геттеры
    ...mapGetters({
      photos: 'photos/getAllPhotos',
      dialogVisible: 'photos/getDialogVisible',
      isLoading: 'photos/getIsLoading',
    }),
  },
};
</script>

<style>
.observer {
  height: 20px;
}
</style>
