<template>
  <v-col cols="6" md="4" lg="3">
    <v-card max-width="400" class="fill-height d-flex flex-column mx-auto" @click="openPhoto">
      <v-card-title class="d-block flex-grow-1">
        <b class="d-block text-center">{{ photo.id }}</b>
        {{ photo.title }}
      </v-card-title>

      <v-card-text class="d-flex justify-center align-end">
        <v-img alt="" max-width="200" :src="photo.url" />
      </v-card-text>

      <v-card-actions @click.stop>
        <v-btn @click="expanderShow = true">
          {{ expanderShow ? 'Hide' : 'Explore' }}
        </v-btn>
        <v-btn
          :icon="expanderShow ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="expanderShow = true"
        >
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-card v-if="expanderShow" class="v-card--reveal" style="height: 100%" @click.stop>
          <v-divider></v-divider>
          <v-card-text>
            <b class="d-block text-center">Card OBJECT:</b>
            <div>
              {{ photo.albumid }}
            </div>
            <div>
              {{ photo.id }}
            </div>
            <div>
              {{ photo.title }}
            </div>
            <div>
              {{ photo.url }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn @click.stop="expanderShow = false"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    expanderShow: false,
  }),
  methods: {
    openPhoto() {
      this.$emit('openPhoto', this.photo);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
