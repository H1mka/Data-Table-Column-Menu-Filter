<template>
  <v-dialog :value="dialogVisible" @click:outside="$store.commit('photos/hideDialog')" width="600">
    <v-card>
      <v-card-title class="justify-space-between">
        {{ photo.title }}
        <v-btn color="orange" @click="$store.commit('photos/hideDialog')"> Back </v-btn>
      </v-card-title>
      <v-card-text>
        <v-img alt="" max-width="600" :src="photo.url" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      dialogVisible: 'photos/getDialogVisible',
      photo: 'photos/getCurrentPhoto',
    }),
  },
};
</script>

<style></style>
