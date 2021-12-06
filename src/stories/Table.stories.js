import TadsTable from "../components/table/Table";
import TadsTableColumn from "../components/table/TableColumn";
import {ref} from "vue";

export default {
  title: 'Table/Table',
  component: TadsTable,
};

const fetchFromApi = async (page, field, direction) => {
  const base = `https://api.themoviedb.org/3/discover/movie?api_key=2dc0ebf5f4268adb59b2d7bab4930782`;

  let sort = ''

  if (field && direction) {
    sort += `&sort_by=${field}.${direction}`
  }

  sort += '&year=2021'
  sort += '&vote_count.gte=5000'

  let url = `${base}&page=${page}${sort}`;

  return await fetch(url)
      .then(response => response.json())
      .then(data => data);
}

const updateData = (page, field = null, direction = null) => {
  fetchFromApi(page, field, direction).then(res => {
    data.value = res.results
    currentPage.value = page
    totalResults.value = res.total_results
  })
}

const currentPage = ref(1);
const totalResults = ref(null);
const sortField = ref('original_title');
const sortOrder = ref(null);

const data = ref([])

let Template = (args) => ({
  components: { TadsTable, TadsTableColumn },
  setup() {
    updateData(1, sortField.value, sortOrder.value)
    return { args, data, currentPage, totalResults, sortField, sortOrder };
  },
  template: `
    <TadsTable 
        v-bind="args" 
        :data="data" 
        v-model:currentPage="currentPage" 
        :total="totalResults" 
        :default-sort="[sortField, sortOrder]">
      <TadsTableColumn field="original_title" label="Title" sortable v-slot="{row}">
        <strong>{{ row.title }}</strong>
      </TadsTableColumn>

      <TadsTableColumn field="vote_average" label="Rating" v-slot="{row}" sortable>
        {{ row.vote_average }}/10 <small>({{ row.vote_count }})</small>
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
  paginationPosition: 'both',
  perPage: 20,
  paginated: true,
  currentPage: currentPage,
  onSort: (field, direction) => {
    sortField.value = field
    sortOrder.value = direction
    updateData(currentPage.value, field, direction)
  },
  onChange: page => {
    updateData(page, sortField.value, sortOrder.value)
  }
};
