<template>
  <!-- <v-card>
    <v-tabs v-model="currentTab" bg-color="primary">
      <v-tab value="one">Item One</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="currentTab">
        <v-window-item value="one"> One </v-window-item>

        <v-window-item value="two"> Two </v-window-item>

        <v-window-item value="three"> Three </v-window-item>
      </v-window>
    </v-card-text>
  </v-card> -->
  <v-container fluid>
    <v-row>
      <v-tabs v-model="tab" grow>
        <v-tab v-for="item in tabsData" :key="item.id" :value="item.name">
          {{ item.name }}
        </v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item v-for="item in tabsData" :key="item.name" :value="item.name">
          <v-card flat>
            <v-img :src="'../assets/prefab_home.jpg'" alt="" height="200px" cover />
            <v-card-text> Test </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tab: 'tabs1',
    tabsData: [
      {
        name: 'tabs1',
        id: 1,
        tabInfo: [
          { id: 1, content: 'Pre-fab homes' },
          { id: 2, content: 'Favorite road trips' },
          { id: 3, content: 'Best airlines' },
        ],
      },
      {
        name: 'tabs2',
        id: 2,
        tabInfo: [
          { id: 1, content: 'Pre-fab homes' },
          { id: 2, content: 'Favorite road trips' },
          { id: 3, content: 'Best airlines' },
        ],
      },
      {
        name: 'tabs3',
        id: 3,
        tabInfo: [
          { id: 1, content: 'Pre-fab homes' },
          { id: 2, content: 'Favorite road trips' },
          { id: 3, content: 'Best airlines' },
        ],
      },
    ],
  }),

  created() {
    this.currentTab = this.tabsData[0].name;
  },
};
</script>

<style></style>
