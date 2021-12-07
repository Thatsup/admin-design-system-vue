<template>
  <nav class="pagination" :class="[rootClasses]">
    <slot name="foo" />
    <slot
        v-if="hasPreviousSlot"
        name="previous"
        :page="getPage(current - 1, {
                class: prevBtnClasses,
                'aria-label': ariaPreviousLabel
        })">
      <TadsIcon
          name="chevron"
          class="is-block"
          rotate="180"
          aria-hidden="true"/>
    </slot>
    <PaginationButton
        v-else
        class="pagination-previous"
        :class="{ 'pagination-link--disabled': !this.hasPrev }"
        :page="getPage(current - 1)">
      <TadsIcon
          name="chevron"
          size="14"
          class="is-block"
          rotate="180"
          aria-hidden="true"/>
    </PaginationButton>
    <slot
        v-if="hasNextSlot"
        name="next"
        :page="getPage(current + 1, {
                class: nextBtnClasses,
                'aria-label': ariaNextLabel,
        })">
      <TadsIcon
          name="chevron"
          size="14"
          class="is-block"
          aria-hidden="true"/>
    </slot>
    <PaginationButton
        v-else
        class="pagination-next"
        :class="{ 'pagination-link--disabled': !this.hasNext }"
        :page="getPage(current + 1)">
      <TadsIcon
          name="chevron"
          size="14"
          class="is-block"
          aria-hidden="true"/>
    </PaginationButton>

    <!-- Simple pagination -->
    <small v-if="simple">
      <template v-if="perPage == 1">
        {{ firstItem }} / {{ total }}
      </template>
      <template v-else>
        {{ firstItem }}-{{ Math.min(current * perPage, total) }} / {{ total }}
      </template>
    </small>

    <ul class="pagination__list" v-else>
      <!--First-->
      <li v-if="hasFirst">
        <slot
            v-if="hasDefaultSlot"
            :page="getPage(1)"
        />
        <PaginationButton
            v-else
            :page="getPage(1)" />
      </li>

      <!-- ... -->
      <li v-if="hasFirstEllipsis"><span class="pagination-ellipsis">&hellip;</span></li>

      <!--Pages-->
      <li v-for="page in pagesInRange" :key="page.number">
        <slot
            v-if="hasDefaultSlot"
            :page="page"
        />

        <PaginationButton
            v-else
            :page="page" />
      </li>

      <!--Last-->
      <li v-if="hasLastEllipsis"><span>&hellip;</span></li>
      <li v-if="hasLast">
        <slot
            v-if="hasDefaultSlot"
            :page="getPage(pageCount)"
        />
        <PaginationButton
            v-else
            :page="getPage(pageCount)" />
      </li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent } from 'vue'

import PaginationButton from './PaginationButton.vue'
import TadsIcon from "../core/Icon.vue";

export default defineComponent({
  name: 'TadsPagination',
  components: {
    PaginationButton,
    TadsIcon,
  },
  provide() {
    return {
      $pagination: this
    }
  },
  emits: ['update:active', 'change', 'update:current'],
  props: {
    /** Total count of items */
    total: [Number, String],
    /** Items count for each page */
    perPage: {
      type: [Number, String],
      default: 20
    },
    /** Current page number, use the .sync modifier (Vue 2.x) or v-model:current (Vue 3.x) to make it two-way binding */
    current: {
      type: [Number, String],
      default: 1
    },
    /** Number of pagination items to show before current page */
    rangeBefore: {
      type: [Number, String],
      default: 1
    },
    /** Number of pagination items to show after current page */
    rangeAfter: {
      type: [Number, String],
      default: 1
    },
    /**
     * Pagination size, optional
     * @values small, medium, large
     */
    size: String,
    /** Simple style */
    simple: Boolean,
    /** Rounded button styles */
    rounded: Boolean,
    /**
     * Buttons order, optional
     * @values centered, right, left
     */
    order: String,
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: String,
    /** Icon to use for previous button */
    iconPrev: {
      type: String,
      default: 'chevron'
    },
    /** Icon to use for next button */
    iconNext: {
      type: String,
      default: 'chevron'
    },
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String,
  },
  computed: {
    prevBtnClasses() {
      return [
        { 'o-pag__link--disabled': !this.hasPrev }
      ]
    },
    nextBtnClasses() {
      return [
        { 'o-pag__link--disabled': !this.hasNext }
      ]
    },
    rootClasses() {
      return [
        this.order,
        this.size,
        {
          'is-simple': this.simple,
          'is-rounded': this.rounded
        }
      ]
    },

    beforeCurrent() {
      return parseInt(this.rangeBefore)
    },

    afterCurrent() {
      return parseInt(this.rangeAfter)
    },

    /**
     * Total page size (count).
     */
    pageCount() {
      return Math.ceil(this.total / this.perPage)
    },

    /**
     * First item of the page (count).
     */
    firstItem() {
      const firstItem = this.current * this.perPage - this.perPage + 1
      return firstItem >= 0 ? firstItem : 0
    },

    /**
     * Check if previous button is available.
     */
    hasPrev() {
      return this.current > 1
    },

    /**
     * Check if first page button should be visible.
     */
    hasFirst() {
      return this.current >= (2 + this.beforeCurrent)
    },

    /**
     * Check if first ellipsis should be visible.
     */
    hasFirstEllipsis() {
      return this.current >= (this.beforeCurrent + 4)
    },

    /**
     * Check if last page button should be visible.
     */
    hasLast() {
      return this.current <= this.pageCount - (1 + this.afterCurrent)
    },

    /**
     * Check if last ellipsis should be visible.
     */
    hasLastEllipsis() {
      return this.current < this.pageCount - (2 + this.afterCurrent)
    },

    /**
     * Check if next button is available.
     */
    hasNext() {
      return this.current < this.pageCount
    },

    /**
     * Get near pages, 1 before and 1 after the current.
     * Also add the click event to the array.
     */
    pagesInRange() {
      if (this.simple) return

      let left = Math.max(1, this.current - this.beforeCurrent)
      if (left - 1 === 2) {
        left-- // Do not show the ellipsis if there is only one to hide
      }
      let right = Math.min(this.current + this.afterCurrent, this.pageCount)
      if (this.pageCount - right === 2) {
        right++ // Do not show the ellipsis if there is only one to hide
      }

      const pages = []
      for (let i = left; i <= right; i++) {
        pages.push(this.getPage(i))
      }
      return pages
    },

    hasDefaultSlot() {
      return this.$slots.default
    },
    hasPreviousSlot() {
      return this.$slots.previous
    },
    hasNextSlot() {
      return this.$slots.next
    }
  },
  watch: {
    /**
     * If current page is trying to be greater than page count, set to last.
     */
    pageCount(value) {
      if (this.current > value) this.last()
    }
  },
  methods: {
    /**
     * Previous button click listener.
     */
    prev(event) {
      this.changePage(this.current - 1, event)
    },
    /**
     * Next button click listener.
     */
    next(event) {
      this.changePage(this.current + 1, event)
    },
    /**
     * First button click listener.
     */
    first(event) {
      this.changePage(1, event)
    },
    /**
     * Last button click listener.
     */
    last(event) {
      this.changePage(this.pageCount, event)
    },

    changePage(num, event) {
      if (this.current === num || num < 1 || num > this.pageCount) return
      this.$emit('change', num)
      this.$emit('update:current', num)

      // Set focus on element to keep tab order
      if (event && event.target) {
        this.$nextTick(() => event.target.focus())
      }
    },

    getPage(num, options = {}) {
      return {
        number: num,
        isCurrent: this.current === num,
        click: (event) => this.changePage(num, event),
        disabled: options.disabled || false,
        class: options.class || '',
        'aria-label': options['aria-label'] || this.getAriaPageLabel(num, this.current === num)
      }
    },

    /**
     * Get text for aria-label according to page number.
     */
    getAriaPageLabel(pageNumber, isCurrent) {
      if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
        return this.ariaPageLabel + ' ' + pageNumber + '.'
      } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
        return this.ariaCurrentLabel + ', ' + this.ariaPageLabel + ' ' + pageNumber + '.'
      }
      return null
    }
  }
})
</script>

<style>
.pagination {
  align-items: center;
  display: flex;
  text-align: center;
  justify-content: space-between;
  font-size: 1rem;
  margin: -.25rem;
}

.pagination__list {
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  list-style: none;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  flex-shrink: 1;
  justify-content: flex-start;
  order: 1;
}

.prev,
.next {
  color: var(--blue-gray-800);
  cursor: pointer;
  display: flex;
  outline: 0;
  background-color: transparent;
}

.pagination-link {
  -webkit-appearance: none;
  align-items: center;
  box-shadow: none;
  display: inline-flex;
  position: relative;
  vertical-align: top;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  line-height: 1.5;
  border: 1px solid transparent;
  border-radius: 4px;
  border-color: var(--blue-gray-500);
  color: var(--blue-gray-800);
  min-width: 2.25em;
  height: var(--input-height);
  padding: .5em .5em;
  margin: .25rem;
}

.pagination-link:hover {
  border-color: var(--blue-gray-600);
}

.pagination-link--current {
  background: var(--blue-600);
  border-color: var(--blue-600);
  color: #fff;
}

.pagination-link--disabled {
  pointer-events: none;
  opacity: .5;
}
</style>
