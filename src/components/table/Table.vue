<template>
  <div
      class="table-wrap"
      :class="tableClasses"
  >
    <div class="table-wrap__inner">
      <div ref="slot" style="display:none">
        <slot />
      </div>

      <slot name="top-header">
        <div class="table-header">
          <slot name="top-left" />

          <template v-if="paginated && (paginationPosition === 'top' || paginationPosition === 'both')">
            <slot name="pagination">
              <Pagination
                  :per-page="perPage"
                  :paginated="paginated"
                  :total="newDataTotal"
                  :current="newCurrentPage"
                  @update:current="newCurrentPage = $event"
                  :icon-pack="iconPack"
                  :rounded="paginationRounded"
                  @page-change="(event) => $emit('page-change', event)"
                  :aria-next-label="ariaNextLabel"
                  :aria-previous-label="ariaPreviousLabel"
                  :aria-page-label="ariaPageLabel"
                  :aria-current-label="ariaCurrentLabel"
              ></Pagination>
            </slot>
          </template>
        </div>
      </slot>
      <table
          :tabindex="!focusable ? false : 0"
          @keydown.self.prevent.up="pressedArrow(-1)"
          @keydown.self.prevent.down="pressedArrow(1)">
        <caption v-if="$slots.caption">
          <slot name="caption" />
        </caption>
        <thead v-if="newColumns.length && showHeader">
        <tr>
          <th v-if="showDetailRowIcon"/>
          <th v-if="checkable && checkboxPosition === 'left'">
            <template v-if="headerCheckable">
              <TadsCheckbox
                  autocomplete="off"
                  :modelValue="isAllChecked"
                  :disabled="isAllUncheckable"
                  @change="checkAll"/>
            </template>
          </th>
          <th
              v-for="(column, index) in visibleColumns"
              :key="column.newKey + ':' + index + 'header'"
              v-bind="column.thAttrs && column.thAttrs(column)"
              :style="column.style"
              :class="{
                'pagination-column--sorted': column.sortable && currentSortColumn === column,
                'pagination-column--sortable': column.sortable,
              }"
              @click.stop="sort(column, null, $event)">

            <template v-if="column.hasHeaderSlot">
              <BSlotComponent
                  :component="column"
                  scoped
                  name="header"
                  tag="span"
                  :props="{ column, index }"
              />
            </template>
            <template v-else>
              <span>
                {{ column.label }}

                <TadsIcon
                    v-show="column.sortable && currentSortColumn === column"
                    :name="sortIcon"
                    :size="sortIconSize"
                    :rotate="!isAsc ? -90 : 90" />
              </span>
            </template>
          </th>
          <th v-if="checkable && checkboxPosition === 'right'">
            <template v-if="headerCheckable">
              <TadsCheckbox
                  autocomplete="off"
                  :modelValue="isAllChecked"
                  :disabled="isAllUncheckable"
                  @change="checkAll"/>
            </template>
          </th>
        </tr>
        <tr v-if="hasSearchablenewColumns">
          <th v-if="showDetailRowIcon" />
          <th v-if="checkable && checkboxPosition === 'left'" />
          <th
              v-for="(column, index) in visibleColumns"
              :key="column.newKey + ':' + index + 'searchable'"
              v-bind="column.thAttrs && column.thAttrs(column)"
              :style="column.style">
            <template v-if="column.searchable">
              <template v-if="column.hasSearchableSlot">
                <BSlotComponent
                    :component="column"
                    scoped
                    name="searchable"
                    tag="span"
                    :props="{ column, filters }"
                />
              </template>
              <TadsInput
                  v-else
                  @[filtersEvent]="onFiltersEvent"
                  v-model="filters[column.field]"
                  :type="column.numeric ? 'number' : 'text'" />
            </template>
          </th>
          <th v-if="checkable && checkboxPosition === 'right'" />
        </tr>
        <tr v-if="hasCustomSubheadings">
          <th v-if="showDetailRowIcon" />
          <th v-if="checkable && checkboxPosition === 'left'" />
          <th
              v-for="(column, index) in visibleColumns"
              :key="column.newKey + ':' + index + 'subheading'"
              :style="column.style"
          >
            <template
                v-if="
                                column.$slots &&
                                column.$slots.subheading
                            ">
              <BSlotComponent
                  :component="column"
                  scoped
                  name="subheading"
                  tag="span"
                  :props="{ column, index }"
              />
            </template>
            <template v-else>{{ column.subheading }}</template>
          </th>
          <th v-if="checkable && checkboxPosition === 'right'" />
        </tr>
        </thead>
        <tbody>
        <template
            v-for="(row, index) in visibleData"
            :key="this.customRowKey ? row[this.customRowKey] : index">
          <tr
              @click="selectRow(row, index)"
              @dblclick="$emit('dblclick', row)"
              @mouseenter="emitEventForRow('mouseenter', $event, row)"
              @mouseleave="emitEventForRow('mouseleave', $event, row)"
              @contextmenu="$emit('contextmenu', row, $event)"
              :draggable="draggable"
              @dragstart="handleDragStart($event, row, index)"
              @dragend="handleDragEnd($event, row, index)"
              @drop="handleDrop($event, row, index)"
              @dragover="handleDragOver($event, row, index)"
              @dragleave="handleDragLeave($event, row, index)">

            <td
                v-if="showDetailRowIcon"
            >

              <TadsIcon
                  v-if="hasDetailedVisible(row)"
                  :name="detailIcon"
                  :rotate="isVisibleDetailRow(row) ? 90 : 0"
                  role="button"
                  @click.stop="toggleDetails(row)"
                  clickable
                  both />
            </td>

            <td
                v-if="checkable && checkboxPosition === 'left'">
              <TadsCheckbox
                  autocomplete="off"
                  :disabled="!isRowCheckable(row)"
                  :modelValue="isRowChecked(row)"
                  @update:modelValue="checkRow(row, index, $event)"
              />
            </td>

            <BSlotComponent
                v-for="(column, colindex) in visibleColumns"
                :key="column.newKey + index + ':' + colindex"
                v-bind="column.tdAttrs && column.tdAttrs(row, column)"
                :component="column"
                scoped
                name="default"
                tag="td"
                :data-label="column.label"
                :props="{ row, column, index, colindex, toggleDetails }"
                @click="$emit('cell-click', row, column, index, colindex, $event)"
            />

            <td
                v-if="checkable && checkboxPosition === 'right'">
              <TadsCheckbox
                  autocomplete="off"
                  :disabled="!isRowCheckable(row)"
                  :modelValue="isRowChecked(row)"
                  @update:modelvalue="checkRow(row, index, $event)"
              />
            </td>
          </tr>

          <transition :name="detailTransition">
            <tr
                v-if="isActiveDetailRow(row)"
                :key="(customRowKey ? row[customRowKey] : index) + 'detail'"
            >
              <td :colspan="columnCount">
                <slot
                    name="detail"
                    :row="row"
                    :index="index"/>
              </td>
            </tr>
          </transition>
          <slot
              v-if="isActiveCustomDetailRow(row)"
              name="detail"
              :row="row"
              :index="index"
          />
        </template>

        <tr v-if="!visibleData.length">
          <td :colspan="columnCount">
            <slot name="empty"/>
          </td>
        </tr>

        </tbody>

        <tfoot v-if="$slots.footer">
        <tr>
          <slot name="footer" v-if="hasCustomFooterSlot()"/>
          <th :colspan="columnCount" v-else>
            <slot name="footer"/>
          </th>
        </tr>
        </tfoot>
      </table>

      <template v-if="loading">
        <slot name="loading">
          Loading...
        </slot>
      </template>

      <slot name="bottom-footer">
        <div class="table-footer">
          <slot name="bottom-left"/>

          <template v-if="(checkable && $slots['bottom-left']) ||
              (paginated && (paginationPosition === 'bottom' || paginationPosition === 'both'))">
            <slot name="pagination">
              <Pagination
                  :per-page="perPage"
                  :paginated="paginated"
                  :total="newDataTotal"
                  :current="newCurrentPage"
                  @update:current="newCurrentPage = $event"
                  :icon-pack="iconPack"
                  :rounded="paginationRounded"
                  @page-change="(event) => $emit('page-change', event)"
                  :aria-next-label="ariaNextLabel"
                  :aria-previous-label="ariaPreviousLabel"
                  :aria-page-label="ariaPageLabel"
                  :aria-current-label="ariaCurrentLabel"
              ></Pagination>
            </slot>
          </template>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import Pagination from '../pagination/Pagination.vue'
import {get} from "lodash/object";
import TadsIcon from "../core/Icon";
import {escapeRegExpChars} from "../../utils/helpers";
import {createApp, createVNode, h} from "vue";
import TableColumn from './TableColumn.vue';
import BSlotComponent from "../../utils/SlotComponent";
import TadsCheckbox from "../core/Checkbox";
import TadsInput from "../core/Input";
import {indexOf} from "lodash/array";
// import NProgress from 'nprogress/nprogress'

export default {
  name: 'TadsTable',
  provide() {
    return {
      $table: this
    }
  },
  components: {TadsInput, TadsCheckbox, BSlotComponent, TadsIcon, Pagination },
  emits: ['page-change'],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    bordered: Boolean,
    striped: Boolean,
    narrowed: Boolean,
    hoverable: Boolean,
    loading: Boolean,
    detailed: Boolean,
    checkable: Boolean,
    headerCheckable: {
      type: Boolean,
      default: true
    },
    checkboxPosition: {
      type: String,
      default: 'left',
      validator: (value) => {
        return [
          'left',
          'right'
        ].indexOf(value) >= 0
      }
    },
    stickyCheckbox: {
      type: Boolean,
      default: false
    },
    selected: Object,
    isRowSelectable: {
      type: Function,
      default: () => true
    },
    focusable: Boolean,
    customIsChecked: Function,
    isRowCheckable: {
      type: Function,
      default: () => true
    },
    checkedRows: {
      type: Array,
      default: () => []
    },
    mobileCards: {
      type: Boolean,
      default: true
    },
    defaultSort: [String, Array],
    defaultSortDirection: {
      type: String,
      default: 'asc'
    },
    sortIcon: {
      type: String,
      default: 'caret'
    },
    sortIconSize: {
      type: Number,
      default: 12
    },
    sortMultiple: {
      type: Boolean,
      default: false
    },
    sortMultipleData: {
      type: Array,
      default: () => []
    },
    sortMultipleKey: {
      type: String,
      default: null
    },
    paginated: Boolean,
    currentPage: {
      type: Number,
      default: 1
    },
    perPage: {
      type: [Number, String],
      default: 20
    },
    showDetailIcon: {
      type: Boolean,
      default: true
    },
    detailIcon: {
      type: String,
      default: 'chevron-right'
    },
    paginationPosition: {
      type: String,
      default: 'bottom',
      validator: (value) => {
        return [
          'bottom',
          'top',
          'both'
        ].indexOf(value) >= 0
      }
    },
    paginationRounded: Boolean,
    backendSorting: Boolean,
    backendFiltering: Boolean,
    rowClass: {
      type: Function,
      default: () => ''
    },
    openedDetailed: {
      type: Array,
      default: () => []
    },
    hasDetailedVisible: {
      type: Function,
      default: () => true
    },
    detailKey: {
      type: String,
      default: ''
    },
    detailTransition: {
      type: String,
      default: ''
    },
    customDetailRow: {
      type: Boolean,
      default: false
    },
    backendPagination: Boolean,
    total: {
      type: [Number, String],
      default: 0
    },
    iconPack: String,
    mobileSortPlaceholder: String,
    customRowKey: String,
    draggable: {
      type: Boolean,
      default: false
    },
    draggableColumn: {
      type: Boolean,
      default: false
    },
    scrollable: Boolean,
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String,
    stickyHeader: Boolean,
    height: [Number, String],
    filtersEvent: {
      type: String,
      default: ''
    },
    cardLayout: Boolean,
    showHeader: {
      type: Boolean,
      default: true
    },
    debounceSearch: Number,
    caption: String,
    showCaption: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visibleDetailRows: this.openedDetailed,
      newData: this.data,
      newDataTotal: this.backendPagination ? this.total : this.data.length,
      newCheckedRows: [...this.checkedRows],
      lastCheckedRowIndex: null,
      newCurrentPage: this.currentPage,
      currentSortColumn: {},
      isAsc: true,
      filters: {},
      defaultSlots: [],
      firstTimeSort: true,
      sequence: 1
    }
  },
  computed: {
    tableWrapperStyle() {
      return {
        height: this.height
      }
    },
    sortMultipleDataComputed() {
      return this.backendSorting ? this.sortMultipleData : this.sortMultipleDataLocal
    },
    tableClasses() {
      return {
        'is-bordered': this.bordered,
        'is-striped': this.striped,
        'is-narrow': this.narrowed,
        'is-hoverable': (
            (this.hoverable || this.focusable) &&
            this.visibleData.length
        )
      }
    },
    tableWrapperClasses() {
      return {
        'has-mobile-cards': this.mobileCards,
        'has-sticky-header': this.stickyHeader,
        'is-card-list': this.cardLayout,
        'table-container': this.isScrollable
      }
    },
    tableStyle() {
      return {
        height: this.height
      }
    },
    /**
     * Splitted data based on the pagination.
     */
    visibleData() {
      if (!this.paginated) return this.newData
      const currentPage = this.newCurrentPage
      const perPage = this.perPage
      if (this.newData.length <= perPage) {
        return this.newData
      } else {
        const start = (currentPage - 1) * perPage
        const end = parseInt(start, 10) + parseInt(perPage, 10)
        return this.newData.slice(start, end)
      }
    },
    visibleColumns() {
      if (!this.newColumns) return this.newColumns
      return this.newColumns.filter((column) => {
        return column.visible || column.visible === undefined
      })
    },
    /**
     * Check if all rows in the page are checked.
     */
    isAllChecked() {
      const validVisibleData = this.visibleData.filter(
          (row) => this.isRowCheckable(row))
      if (validVisibleData.length === 0) return false
      const isAllChecked = validVisibleData.some((currentVisibleRow) => {
        return indexOf(this.newCheckedRows, currentVisibleRow, this.customIsChecked) < 0
      })
      return !isAllChecked
    },
    /**
     * Check if all rows in the page are checkable.
     */
    isAllUncheckable() {
      const validVisibleData = this.visibleData.filter(
          (row) => this.isRowCheckable(row))
      return validVisibleData.length === 0
    },
    /**
     * Check if has any sortable column.
     */
    hasSortablenewColumns() {
      return this.newColumns.some((column) => {
        return column.sortable
      })
    },
    /**
     * Check if has any searchable column.
     */
    hasSearchablenewColumns() {
      return this.newColumns.some((column) => {
        return column.searchable
      })
    },
    /**
     * Check if has any column using subheading.
     */
    hasCustomSubheadings() {
      if (this.$slots.subheading) return true
      return this.newColumns.some((column) => {
        return column.subheading || (column.$slots.subheading)
      })
    },
    /**
     * Return total column count based if it's checkable or expanded
     */
    columnCount() {
      let count = this.visibleColumns.length
      count += this.checkable ? 1 : 0
      count += (this.detailed && this.showDetailIcon) ? 1 : 0
      return count
    },
    /**
     * return if detailed row tabled
     * will be with chevron column & icon or not
     */
    showDetailRowIcon() {
      return this.detailed && this.showDetailIcon
    },
    /**
     * return if scrollable table
     */
    isScrollable() {
      if (this.scrollable) return true
      if (!this.newColumns) return false
      return this.newColumns.some((column) => {
        return column.sticky
      })
    },
    newColumns() {
      if (this.columns && this.columns.length) {
        return this.columns.map((column) => {
          const vnode = createVNode(TableColumn, column, (props) => {
            const vnode = h('span', {}, get(props.row, column.field))
            return [vnode]
          })
          return createApp(vnode)
              .provide('$table', this)
              .mount(document.createElement('div'))
        })
      }

      return this.defaultSlots
          .filter((vnode) =>
              vnode && vnode.$data && vnode.$data._isTableColumn
          )
    },
    canDragRow() {
      return this.draggable && !this.isDraggingColumn
    },
    canDragColumn() {
      return this.draggableColumn && !this.isDraggingRow
    }
  },
  watch: {
    /**
     * When data prop change:
     *   1. Update internal value.
     *   2. Reset newColumns (thead), in case it's on a v-for loop.
     *   3. Sort again if it's not backend-sort.
     *   4. Set new total if it's not backend-paginated.
     */
    data(value) {
      this.isLoading = false
      this.newData = value

      if (!this.backendSorting) {
        this.sort(this.currentSortColumn, true)
      }

      if (!this.backendPagination) {
        this.newDataTotal = this.newData.length
      }
    },

    /**
     * When Pagination total change, update internal total
     * only if it's backend-paginated.
     */
    total(newTotal) {
      if (!this.backendPagination) return
      this.newDataTotal = newTotal
    },

    currentPage(newVal) {
      this.newCurrentPage = newVal
    }
  },
  methods: {
    onFiltersEvent(event) {
      this.$emit(`filters-event-${this.filtersEvent}`, { event, filters: this.filters })
    },
    handleFiltersChange(value) {
      if (this.backendFiltering) {
        this.$emit('filters-change', value)
      } else {
        this.newData = this.data.filter((row) => this.isRowFiltered(row))
        if (!this.backendPagination) {
          this.newDataTotal = this.newData.length
        }
        if (!this.backendSorting) {
          if (Object.keys(this.currentSortColumn).length > 0) {
            this.doSortSingleColumn(this.currentSortColumn)
          }
        }
      }
    },
    /**
     * Sort an array by key without mutating original data.
     * Call the user sort function if it was passed.
     */
    sortBy(array, key, fn, isAsc) {
      let sorted = []
      // Sorting without mutating original data
      if (fn && typeof fn === 'function') {
        sorted = [...array].sort((a, b) => fn(a, b, isAsc))
      } else {
        sorted = [...array].sort((a, b) => {
          // Get nested values from objects
          let newA = get(a, key)
          let newB = get(b, key)
          // sort boolean type
          if (typeof newA === 'boolean' && typeof newB === 'boolean') {
            return isAsc ? newA > newB ? 1 : -1: newA > newB ? -1 : 1
          }
          if (!newA && newA !== 0) return 1
          if (!newB && newB !== 0) return -1
          if (newA === newB) return 0
          newA = (typeof newA === 'string')
              ? newA.toUpperCase()
              : newA
          newB = (typeof newB === 'string')
              ? newB.toUpperCase()
              : newB
          return isAsc
              ? newA > newB ? 1 : -1
              : newA > newB ? -1 : 1
        })
      }
      return sorted
    },
    /**
     * Sort the column.
     * Toggle current direction on column if it's sortable
     * and not just updating the prop.
     */
    sort(column, updatingData = false, event = null) {
      if (!column || !column.sortable) return
      if (!updatingData) {
        this.isAsc = column === this.currentSortColumn
            ? !this.isAsc
            : (this.defaultSortDirection.toLowerCase() !== 'desc')
      }
      if (!this.firstTimeSort) {
        /**
         * @property {string} field column field
         * @property {boolean} direction 'asc' or 'desc'
         * @property {Event} event native event
         */
        this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc', event)
      }
      if (!this.backendSorting) {
        this.doSortSingleColumn(column)
      }
      this.currentSortColumn = column
    },
    doSortSingleColumn(column) {
      this.newData = this.sortBy(
          this.newData,
          column.field,
          column.customSort,
          this.isAsc
      )
    },
    isRowSelected(row, selected) {
      if (!selected) {
        return false
      }
      if (this.customRowKey) {
        return row[this.customRowKey] === selected[this.customRowKey]
      }
      return row === selected
    },
    /**
     * Check if the row is checked (is added to the array).
     */
    isRowChecked(row) {
      return indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0
    },
    /**
     * Remove a checked row from the array.
     */
    removeCheckedRow(row) {
      const index = indexOf(this.newCheckedRows, row, this.customIsChecked)
      if (index >= 0) {
        this.newCheckedRows.splice(index, 1)
      }
    },
    /**
     * Header checkbox click listener.
     * Add or remove all rows in current page.
     */
    checkAll() {
      const isAllChecked = this.isAllChecked
      this.visibleData.forEach((currentRow) => {
        if (this.isRowCheckable(currentRow)) {
          this.removeCheckedRow(currentRow)
        }
        if (!isAllChecked) {
          if (this.isRowCheckable(currentRow)) {
            this.newCheckedRows.push(currentRow)
          }
        }
      })
      /**
       * @property {Array<Object>} newCheckedRows checked rows
       */
      this.$emit('check', this.newCheckedRows)
      this.$emit('check-all', this.newCheckedRows)
      // Emit checked rows to update user variable
      this.$emit('update:checkedRows', this.newCheckedRows)
    },
    /**
     * Row checkbox click listener.
     */
    checkRow(row, index, event) {
      if (!this.isRowCheckable(row)) return
      const lastIndex = this.lastCheckedRowIndex
      this.lastCheckedRowIndex = index
      if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
        this.shiftCheckRow(row, index, lastIndex)
      } else if (!this.isRowChecked(row)) {
        this.newCheckedRows.push(row)
      } else {
        this.removeCheckedRow(row)
      }
      this.$emit('check', this.newCheckedRows, row)
      // Emit checked rows to update user variable
      this.$emit('update:checkedRows', this.newCheckedRows)
    },
    /**
     * Check row when shift is pressed.
     */
    shiftCheckRow(row, index, lastCheckedRowIndex) {
      // Get the subset of the list between the two indicies
      const subset = this.visibleData.slice(
          Math.min(index, lastCheckedRowIndex),
          Math.max(index, lastCheckedRowIndex) + 1
      )
      // Determine the operation based on the state of the clicked checkbox
      const shouldCheck = !this.isRowChecked(row)
      subset.forEach((item) => {
        this.removeCheckedRow(item)
        if (shouldCheck && this.isRowCheckable(item)) {
          this.newCheckedRows.push(item)
        }
      })
    },
    /**
     * Row click listener.
     * Emit all necessary events.
     */
    selectRow(row, index) {
      /**
       * @property {Object} row clicked row
       * @property {number} index index of clicked row
       */
      this.$emit('click', row, index)
      if (this.selected === row) return
      if (!this.isRowSelectable(row)) return
      // Emit new and old row
      /**
       * @property {Object} row selected row
       * @property {Array<Object>} selected selected rows
       */
      this.$emit('select', row, this.selected)
      // Emit new row to update user variable
      this.$emit('update:selected', row)
    },
    /**
     * Toggle to show/hide details slot
     */
    toggleDetails(obj) {
      const found = this.isVisibleDetailRow(obj)
      if (found) {
        this.closeDetailRow(obj)
        this.$emit('details-close', obj)
      } else {
        this.openDetailRow(obj)
        this.$emit('details-open', obj)
      }
      // Syncs the detailed rows with the parent component
      this.$emit('update:openedDetailed', this.visibleDetailRows)
    },
    openDetailRow(obj) {
      const index = this.handleDetailKey(obj)
      this.visibleDetailRows.push(index)
    },
    closeDetailRow(obj) {
      const index = this.handleDetailKey(obj)
      const i = this.visibleDetailRows.indexOf(index)
      if (i >= 0) {
        this.visibleDetailRows.splice(i, 1)
      }
    },
    isVisibleDetailRow(obj) {
      const index = this.handleDetailKey(obj)
      return this.visibleDetailRows.indexOf(index) >= 0
    },
    isActiveDetailRow(row) {
      return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row)
    },
    isActiveCustomDetailRow(row) {
      return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row)
    },
    isRowFiltered(row) {
      for (const key in this.filters) {
        if (!this.filters[key]) continue
        const input = this.filters[key]
        const column = this.newColumns.filter((c) => c.field === key)[0]
        if (column && column.customSearch && typeof column.customSearch === 'function') {
          if (!column.customSearch(row, input)) return false
        } else {
          let value = get(row, key)
          if (value == null) return false
          if (Number.isInteger(value)) {
            if (value !== Number(input)) return false
          } else {
            const re = new RegExp(escapeRegExpChars(input), 'i')
            if (!re.test(value)) return false
          }
        }
      }
      return true
    },
    /**
     * When the detailKey is defined we use the object[detailKey] as index.
     * If not, use the object reference by default.
     */
    handleDetailKey(index) {
      const key = this.detailKey
      return !key.length || !index
          ? index
          : index[key]
    },
    /**
     * Call initSort only first time (For example async data).
     */
    checkSort() {
      if (this.newColumns.length && this.firstTimeSort) {
        this.initSort()
        this.firstTimeSort = false
      } else if (this.newColumns.length) {
        if (Object.keys(this.currentSortColumn).length > 0) {
          for (let i = 0; i < this.newColumns.length; i++) {
            if (this.newColumns[i].field === this.currentSortColumn.field) {
              this.currentSortColumn = this.newColumns[i]
              break
            }
          }
        }
      }
    },
    /**
     * Check if footer slot has custom content.
     */
    hasCustomFooterSlot() {
      if (this.$slots.footer) {
        const footer = this.$slots.footer()
        if (footer.length > 1) return true
        const tag = footer[0].tag
        if (tag !== 'th' && tag !== 'td') return false
      }
      return true
    },
    /**
     * Table arrow keys listener, change selection.
     */
    pressedArrow(pos) {
      if (!this.visibleData.length) return
      let index = this.visibleData.indexOf(this.selected) + pos
      // Prevent from going up from first and down from last
      index = index < 0
          ? 0
          : index > this.visibleData.length - 1
              ? this.visibleData.length - 1
              : index
      const row = this.visibleData[index]
      if (!this.isRowSelectable(row)) {
        let newIndex = null
        if (pos > 0) {
          for (let i = index; i < this.visibleData.length && newIndex === null; i++) {
            if (this.isRowSelectable(this.visibleData[i])) newIndex = i
          }
        } else {
          for (let i = index; i >= 0 && newIndex === null; i--) {
            if (this.isRowSelectable(this.visibleData[i])) newIndex = i
          }
        }
        if (newIndex >= 0) {
          this.selectRow(this.visibleData[newIndex])
        }
      } else {
        this.selectRow(row)
      }
    },
    /**
     * Focus table element if has selected prop.
     */
    focus() {
      if (!this.focusable) return
      this.$el.querySelector('table').focus()
    },
    /**
     * Initial sorted column based on the default-sort prop.
     */
    initSort() {
      if (!this.defaultSort) return
      let sortField = ''
      let sortDirection = this.defaultSortDirection
      if (Array.isArray(this.defaultSort)) {
        sortField = this.defaultSort[0]
        if (this.defaultSort[1]) {
          sortDirection = this.defaultSort[1]
        }
      } else {
        sortField = this.defaultSort
      }
      const sortColumn = this.newColumns.filter(
          (column) => (column.field === sortField))[0]
      if (sortColumn) {
        this.isAsc = sortDirection.toLowerCase() !== 'desc'
        this.sort(sortColumn, true)
      }
    },
    /**
     * Emits drag start event
     */
    handleDragStart(event, row, index) {
      if (!this.draggable) return
      this.$emit('dragstart', {event, row, index})
    },
    /**
     * Emits drag leave event
     */
    handleDragEnd(event, row, index) {
      if (!this.draggable) return
      this.$emit('dragend', {event, row, index})
    },
    /**
     * Emits drop event
     */
    handleDrop(event, row, index) {
      if (!this.draggable) return
      this.$emit('drop', {event, row, index})
    },
    /**
     * Emits drag over event
     */
    handleDragOver(event, row, index) {
      if (!this.draggable) return
      this.$emit('dragover', {event, row, index})
    },
    /**
     * Emits drag leave event
     */
    handleDragLeave(event, row, index) {
      if (!this.draggable) return
      this.$emit('dragleave', {event, row, index})
    },
    emitEventForRow(eventName, event, row) {
      return this.$attrs[eventName] ? this.$emit(eventName, row, event) : null
    },
    _addColumn(column) {
      if (typeof window !== 'undefined') {
        this.$nextTick(() => {
          this.defaultSlots.push(column)
          requestAnimationFrame(() => {
            const div = this.$refs['slot']
            if (div && div.children) {
              const position = [...div.children].map(c =>
                  parseInt(c.getAttribute('data-id'), 10)).indexOf(column.newKey)
              if (position !== this.defaultSlots.length) {
                this.defaultSlots.splice(position, 0, column);
                this.defaultSlots = this.defaultSlots.slice(0, this.defaultSlots.length - 1)
              }
            }
          })
        })
      }
    },
    _removeColumn(column) {
      this.$nextTick(() => {
        this.defaultSlots = this.defaultSlots.filter(d => d.newKey !== column.newKey)
      })
    },
    _nextSequence() {
      return this.sequence++
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.checkSort()
    })
  },
}
</script>

<style>
.table-wrap {
  --table-column-spacing-left: 28px;
}

.table-wrap__inner table {
  width: 100%;
  border-collapse: collapse;
}

.table-wrap {
  display: block;
}

.table-wrap__inner {
  overflow-x: auto;
  white-space: nowrap;
}

.table-wrap__inner th {
  padding-top: 25px;
  padding-bottom: 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--blue-gray-600);
  border-bottom: 1px solid var(--gray-300);
  text-align: left;
}

.table-wrap th, . table-wrap td {
  padding-right: 10px;
  font-weight: unset;
}

.table-wrap td {
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
  color: var(--blue-gray-800);
}

.table-wrap.is-striped tbody tr:nth-child(odd) td {
  background-color: var(--gray-100);
}

.table-wrap tbody tr:not(:first-child) td {
  border-top: 1px solid var(--gray-300);
}

.table-wrap td:first-child,
.table-wrap th:first-child {
  padding-left: var(--table-column-spacing-left);
}

.table-header .pagination {
  border: 0;
}

th.pagination-column--sorted {
  color: var(--blue-gray-800);
  border-color: var(--blue-gray-500);
}

th.pagination-column--sortable {
  cursor: pointer;
}

.table-header,
.table-footer {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-left: var(--table-column-spacing-left);
  padding-top: 16px;
  padding-bottom: 16px;
}
</style>
