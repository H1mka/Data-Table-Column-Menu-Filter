<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" item-key="name" show-select>
    <template v-for="(col, i) in filters" v-slot:[`header.${i}`]="{ header }">
      <div style="display: inline-block; padding: 16px 0">{{ header.text }}</div>
      <div style="float: right; margin-top: 8px">
        <v-menu
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
          transition="slide-y-transition"
          left
          fixed
          style="position: absolute; right: 0"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="indigo"
              icon
              v-bind="attrs"
              v-on="on"
              @click="handleClickFilter(header.value)"  NEW
            >
              <v-icon
                small
                :color="
                  activeFilters[header.value] &&
                  activeFilters[header.value].length < filters[header.value].length
                    ? 'red'
                    : 'default'
                "
              >
                mdi-filter-variant
              </v-icon>
            </v-btn>
          </template>
          <!-- разобрал -->
          <v-list flat dense class="pa-0">
            <v-list-item-group multiple v-model="activeFilters[header.value]" class="py-2">
              <template v-for="(item, i) in filters[header.value]">
                <v-list-item
                  :key="`${item}`"
                  :value="item"
                  :ripple="false"
                  v-if="checkFilter(header.value, item)"  NEW
                >
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        :true-value="item"
                        @click="toggle"
                        color="primary"
                        :ripple="false"
                        dense
                      ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
            <v-divider></v-divider>
            <v-row no-gutters>
              <v-col cols="6">
                <v-btn text block @click="toggleAll(header.value)" color="success"
                  >Toggle all</v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn text block @click="clearAll(header.value)" color="warning">Clear all</v-btn>
              </v-col>
            </v-row>
          </v-list>
        </v-menu>
      </div>
    </template>
    <template v-slot:header="{ props: { headers } }">
      <thead>
        <tr>
          <th :colspan="headers.length">This is a header</th>
        </tr>
      </thead>
    </template>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    mainColumn: 'name',
    filters: { name: [], calories: [], status: [] },
    activeFilters: { name: [], calories: [], status: [] },
    availableFilters: { name: [], calories: [], status: [] }, /* NEW */
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    headers() {
      return [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: true,
          value: 'name',
          filter: (value) => {
            return this.filterByActiveFilters(value, 'name');
          },
        },
        {
          text: 'Calories',
          value: 'calories',
          filter: (value) => {
            return this.filterByActiveFilters(value, 'calories');
          },
        },
        {
          text: 'Status',
          value: 'status',
          filter: (value) => {
            return this.filterByActiveFilters(value, 'status');
          },
        },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
      ];
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
    filteredDesserts() {
      return this.desserts.filter((des) => {
        return Object.keys(this.activeFilters).every((propName) => {
          return (
            this.activeFilters[propName].length < 1 ||
            this.activeFilters[propName].includes(des[propName])
          );
        });
      });
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    desserts(val) {
      this.initFilters();
      //this.activeFilters = {} // TODO change this
      //this.activeFilters = Object.assign({}, this.filters)
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    /* NEW, все изменения помечены комментарием NEW */

    fillAvailableFilters(propName) {
      /* 
        Заполняет модель данных availableFilters доступными фильтрами 
        Вызывается при нажатии на иконку фильтра и "clear all"
      */
      this.availableFilters[propName] = [];
      this.filteredDesserts.forEach((item) => {
        if (!this.availableFilters[propName].includes(item[propName]))
          this.availableFilters[propName].push(item[propName]);
      });
    },
    handleClickFilter(propName) {
      this.fillAvailableFilters(propName);
    },
    checkFilter(propName, item) {
      /* 
        Определяет, показывать checkbox или нет
      */
      if(!this.availableFilters[propName]) return false

      return this.availableFilters[propName].includes(item);
    },
    /* !!! --- !!! */


    filterByActiveFilters(value, propertyName) {
      return this.activeFilters[propertyName] && this.activeFilters[propertyName].length > 0
        ? this.activeFilters[propertyName].includes(value)
        : true;
    },
    initialize() {
      this.desserts = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          status: 'DIET',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          status: 'NO DIET',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          status: 'DIET',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          status: 'NO DIET',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          status: 'DIET',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          status: 'NO DIET',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          status: 'NO DIET',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          status: 'NO DIET',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          status: 'FAT DIET',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          status: 'FAT DIET',
        },
      ];
      //this.initFilters()
    },

    initFilters() {
      // Инициализация фильтров
      for (let col in this.filters) {
        // console.log(col); // Название фильтров (name, calories, status)
        this.filters[col] = this.desserts
          .map((d) => {
            // Из десертов достаются имена диссертов
            return d[col];
          })
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
      }
      // TODO restore previous activeFilters before add/remove item
      // this.activeFilters = Object.assign({}, this.filters);    /* NEW, должно быть закомментированно */
      /*if (Object.keys(this.activeFilters).length === 0) this.activeFilters = Object.assign({}, this.filters)
      else {
        setTimeout(() => {
          console.log(this.activeFilters)
          //this.activeFilters = Object.assign({}, this.filters)
        }, 1)
      }*/
    },

    toggleAll(col) {
      this.activeFilters[col] = this.desserts
        .map((d) => {
          return d[col];
        })
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
    },

    clearAll(col) {
      this.activeFilters[col] = [];
      this.fillAvailableFilters(col); // NEW
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style>
.v-list--dense .v-list-item,
.v-list-item--dense {
  min-height: 20px !important;
  height: 2rem;
}

.v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 0.5rem !important;
}

.v-list-item--link {
  transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.v-list-item--link:hover {
  background-color: rgba(0, 0, 0, 0.13);
}
</style>
