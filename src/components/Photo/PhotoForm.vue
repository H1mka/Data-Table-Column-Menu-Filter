<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field label="Title" variant="solo-inverted" v-model="title" />
      </v-col>
      <v-col cols="12" md="4">
        <v-file-input label="File input" variant="solo-inverted" v-model="file" />
      </v-col>
      <v-col cols="12" md="4" class="d-flex align-center">
        <v-btn @click="addPhoto">Добавить</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      file: null,
    };
  },
  methods: {
    addPhoto() {
      if (!this.file) return;

      const reader = new FileReader();

      reader.onload = () => {
        const newPhoto = {
          id: new Date().toString(),
          title: this.title,
          url: reader.result,
        };

        this.$emit('addPhoto', newPhoto);
        this.title = '';
        this.file = null;
      };

      reader.readAsDataURL(this.file);
    },
  },
};
</script>

<style></style>
