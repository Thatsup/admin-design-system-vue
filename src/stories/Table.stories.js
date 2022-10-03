import TadsInput from "../components/core/Input.vue";
import TadsTable from "../components/table/Table.vue";
import TadsTableColumn from "../components/table/TableColumn.vue";
import {ref, watch} from "vue";
import {isNumber} from "lodash/lang";

export default {
  title: 'Table/Table',
  component: TadsTable,
};

const fetchFromApi = async (page, field, direction, searchTerm, year) => {
  let base = `https://api.themoviedb.org/3/discover/movie?api_key=2dc0ebf5f4268adb59b2d7bab4930782`;
  let sort = ''

  if (searchTerm) {
    sort += `&query=${searchTerm}`
    base = `https://api.themoviedb.org/3/search/movie?api_key=2dc0ebf5f4268adb59b2d7bab4930782`;
  }

  if (field && direction) {
    sort += `&sort_by=${field}.${direction}`
  }

  sort += '&primary_release_year=' + year
  sort += '&vote_count.gte=1000'
  sort += '&with_original_language=en'

  let url = `${base}&page=${page}${sort}`;

  return await fetch(url)
      .then(response => response.json())
      .then(data => data);
}

const updateData = (page, field = null, direction = null, searchTerm = null, year = 2021) => {
  fetchFromApi(page, field, direction, searchTerm, year).then(res => {
    data.value = res.results
    currentPage.value = page
    totalResults.value = res.total_results
  })
}

const currentPage = ref(1);
const totalResults = ref(null);
const sortField = ref('original_title');
const sortOrder = ref(null);
const query = ref('');
const yearInput = ref(2021);
const data = ref([])

let Template = (args) => ({
  components: { TadsTable, TadsTableColumn, TadsInput },
  setup() {
    updateData(1, sortField.value, sortOrder.value)

    watch([query, yearInput], val => {
      updateData(1, sortField, sortOrder, val[0], val[1])
    })

    return { args, data, currentPage, totalResults, sortField, sortOrder, query, yearInput };
  },
  template: `
    <TadsTable 
        v-bind="args" 
        :data="data" 
        v-model:currentPage="currentPage" 
        :total="totalResults" 
        :default-sort="[sortField, sortOrder]">
      <template #top-left>
        <TadsInput border :expanded="false" placeholder="Find movie..." v-model="query"></TadsInput>
        <TadsInput type="number" border :expanded="false" placeholder="Year..." v-model="yearInput" max="2099" :min="1900"></TadsInput>
      </template>
      
      <TadsTableColumn field="original_title" label="Title" sortable v-slot="{row}">
        <strong>{{ row.original_title }}</strong>
      </TadsTableColumn>

      <TadsTableColumn field="vote_average" label="Rating" v-slot="{row}" sortable>
        {{ row.vote_average }}/10 <small>({{ row.vote_count }})</small>
      </TadsTableColumn>

      <TadsTableColumn field="release_date" label="Released" v-slot="{row}">
        {{ row.release_date }}
      </TadsTableColumn>
      
      <TadsTableColumn field="original_language" label="Language" v-slot="{row}">
        {{ row.original_language }}
      </TadsTableColumn>

      <TadsTableColumn field="poster_path" label="Poster" v-slot="{row}">
        <img :key="row.poster_path" :src="'https://image.tmdb.org/t/p/w500/' + row.poster_path" alt="" width="60">
      </TadsTableColumn>
    </TadsTable>`
});

export const Default = Template.bind({});
Default.args = {};

export const Backend = Template.bind({
  mounted() {
    updateData(1, sortField.value, sortOrder.value)
  }
});
Backend.args = {
  data: [],
  backendPagination: true,
  backendSorting: true,
  paginationPosition: 'top',
  perPage: 20,
  paginated: true,
  currentPage: currentPage,
  onSort: (field, direction) => {
    sortField.value = field
    sortOrder.value = direction
    query.value = ''
    currentPage.value = 1
    updateData(currentPage.value, field, direction, query.value, yearInput.value)
  },
  onPageChange: page => {
    if (!isNumber(page)) return

    updateData(page, sortField.value, sortOrder.value, query.value, yearInput.value)
  }
};
