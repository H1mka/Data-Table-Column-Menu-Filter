/* __placeholder__ */
export default (await import('vue')).defineComponent({
  data: () => ({
    dialog: false,
    mainColumn: 'name',
    filters: { name: [], calories: [], status: [] },
    activeFilters: {},
    disableFilters: { name: [], calories: [], status: [] },
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
    // filteredDesserts() {
    //   return this.desserts.filter((des) => {
    //     return Object.keys(this.activeFilters).every((propName) => {
    //       return (
    //         this.activeFilters[propName].length < 1 ||
    //         this.activeFilters[propName].includes(des[propName])
    //       );
    //     });
    //   });
    // },
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
    // activeFilters: {
    //   handler(val, oldVal) {
    //     console.log('next', val);
    //     console.log('prev', oldVal);
    //     console.log(val === oldVal);
    //   },
    //   deep: true,
    // },
    'activeFilters.name'(nextValue, prevValue) {
      if (!nextValue || !prevValue) return;

      // console.log('new', nextValue);
      // console.log('old', prevValue);
      const disabledEl = prevValue.find((item) => !nextValue.includes(item));
      this.disableFilters.name.push(disabledEl);
      // console.log(disabledEl);
    },
    disableFilters: {
      handler() {
        console.log('change');
      },
      deep: true,
    },
    /*filters: {
deep: true,
handler(val) {
console.log(val)
}
}*/
  },

  created() {
    this.initialize();
  },

  methods: {
    filterByActiveFilters(value, propertyName) {
      // if (!this.desserts) return;
      // const desserts = [...this.desserts].filter(() => {});
      // console.log('propery:', propertyName, 'val: ', value);
      return this.activeFilters[propertyName]
        ? this.activeFilters[propertyName].includes(value)
        : true;
      // // Check if the item passes all active filters
      // return Object.keys(this.activeFilters).every((key) => {
      //   // If there are active filters for the key, check if the item's value matches
      //   return !this.activeFilters[key].length || this.activeFilters[key].includes(item[key]);
      // });
    },
    initialize() {
      this.desserts = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6,
          carbs: 24,
          protein: 4,
          status: 'DIET',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9,
          carbs: 37,
          protein: 4.3,
          status: 'NO DIET',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16,
          carbs: 23,
          protein: 6,
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
          fat: 16,
          carbs: 49,
          protein: 3.9,
          status: 'DIET',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0,
          carbs: 94,
          protein: 0,
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
          fat: 25,
          carbs: 51,
          protein: 4.9,
          status: 'FAT DIET',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26,
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
      // this.activeFilters = Object.assign({}, this.filters); // Действия с фильтрация происходят с этим объектов
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
});
