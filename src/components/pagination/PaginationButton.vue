<template>
  <component
      :is="tag"
      role="button"
      class="pagination-link"
      :class="{'pagination-link--current': page.isCurrent}"
      :href="href"
      :disabled="isDisabled"
      v-bind="$attrs"
      @click.prevent="page.click"
      :aria-label="page['aria-label']"
      :aria-current="page.isCurrent">
    <slot>{{ page.number }}</slot>
  </component>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TadsPaginationButton',
  inject: ['$pagination'],
  configField: 'pagination',
  props: {
    page: {
      type: Object,
      required: true
    },
    tag: {
      type: String,
      default: 'a',
      validator: (value) => ['a', 'button', 'input', 'router-link', 'nuxt-link'].indexOf(value) >= 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    href() {
      if (this.tag === 'a') {
        return '#'
      }
      return ''
    },
    isDisabled() {
      if (this.tag === 'a') return null
      return this.disabled || this.page.disabled
    }
  }
})
</script>
