<template>
  <div class="autocomplete control" :class="{ 'is-expanded': expanded, [position]: position }">
    <TadsInput
      v-model="newValue"
      type="text"
      ref="input"
      :autocomplete="newAutocomplete"
      v-bind="$attrs"
      @input="onInput"
      @focus="focused"
      @blur="onBlur"
      @keydown.esc.prevent="isActive = false"
      @keydown.tab="tabPressed"
      @keydown.enter.prevent="enterPressed"
      @keydown.up.prevent="keyArrows('up')"
      @keydown.down.prevent="keyArrows('down')"
      :small="small"
      :large="large"
      :is-loading="isLoading"
    ></TadsInput>

    <transition name="fade">
      <div
        v-show="isActive && (data.length > 0 || hasEmptySlot || hasHeaderSlot || canCreate)"
        ref="dropdown"
        class="dropdown-menu"
        :class="{ 'is-opened-top': !isListInViewportVertically }"
      >
        <div v-show="isActive" class="dropdown-content">
          <div v-if="hasHeaderSlot" class="dropdown-item">
            <slot name="header" />
          </div>
          <a
            v-for="(option, index) in filteredData"
            :key="index"
            class="dropdown-item"
            :class="{ 'is-hovered': option === hovered }"
            :title="getValue(option, true)"
            @click="setSelected(option)"
          >
            <slot v-if="hasDefaultSlot" :option="option" :index="index" :is-hovered="option === hovered" />
            <span v-else>
              {{ getValue(option, true) }}
            </span>
          </a>
          <a v-if="canCreate" @click="createItem" class="dropdown-item">
            <TadsIcon name="plus-heavy" size="14" class="mr-2" />
            Create new
          </a>
          <div
            v-if="data.length === 0 && hasEmptySlot"
            class="dropdown-item is-disabled"
          >
            <slot name="empty" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getValueByPath } from "../utils/helpers";
import TadsInput from "../core/Input.vue";
import { ref } from 'vue'
import TadsIcon from "../core/Icon.vue";

export default {
  name: "TadsAutocomplete",
  emits: ['update:modelValue', 'selected', 'active', 'typing', 'create'],
  components: { TadsIcon, TadsInput },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    data: {
      type: Array,
      default: () => []
    },
    field: {
      type: String,
      default: "name"
    },
    keepFirst: Boolean,
    clearOnSelect: Boolean,
    openOnFocus: Boolean,
    small: Boolean,
    large: Boolean,
    backend: Boolean,
    isLoading: Boolean,
    expanded: Boolean,
    canCreate: Boolean,
    filterFunction: {
      type: Function,
    },
    position: {
      type: String,
      default: "bottom",
      validator(value) {
        return (
          ["bottom", "top", "bottom-left", "bottom-right"].indexOf(value) > -1
        );
      }
    },
    customFormatter: {
      type: Function,
      default: undefined
    },
    preselected: {
      type: [Object, String, Number],
      required: false,
      default: null
    },
    allowCustom: Boolean
  },
  data() {
    return {
      selected: null,
      // hovered: null,
      isActive: false,
      newValue: this.modelValue,
      newAutocomplete: this.autocomplete || "off",
      isListInViewportVertically: true,
      hasFocus: false,
      _isAutocomplete: true,
      _elementRef: 'input'
    };
  },
  setup() {
    let hoveredIndex = ref(null);

    return {
      hoveredIndex
    }
  },
  computed: {
    hovered() {
      return this.hoveredIndex === null? null : this.filteredData[this.hoveredIndex];
    },
    filteredData() {
      if (this.backend) {
        return this.data
      }

      if (this.filterFunction) {
        return this.filterFunction(this.data, this.newValue, this.field)
      }

      return this.data.filter(option => {
        return this.getValue(option)
                .toString()
                .toLowerCase()
                .indexOf(this.newValue.toLowerCase()) >= 0
      });
    },
    /**
     * White-listed items to not close when clicked.
     * Add input, dropdown and all children.
     */
    whiteList() {
      const whiteList = [];
      whiteList.push(this.$refs.input.$refs.input);
      whiteList.push(this.$refs.dropdown);
      // Add all children from dropdown
      if (this.$refs.dropdown !== undefined) {
        const children = this.$refs.dropdown.querySelectorAll("*");
        for (const child of children) {
          whiteList.push(child);
        }
      }

      return whiteList;
    },

    /**
     * Check if exists default slot
     */
    hasDefaultSlot() {
      return !!this.$slots.default;
    },

    /**
     * Check if exists "empty" slot
     */
    hasEmptySlot() {
      return !!this.$slots.empty;
    },

    /**
     * Check if exists "header" slot
     */
    hasHeaderSlot() {
      return !!this.$slots.header;
    }
  },
  watch: {
    /**
     * When dropdown is toggled, check the visibility to know when
     * to open upwards.
     */
    isActive(active) {
      if (active) {
        this.calcDropdownInViewportVertical();
      } else {
        this.$nextTick(() => this.setHovered(null));
        // Timeout to wait for the animation to finish before recalculating
        setTimeout(() => {
          this.calcDropdownInViewportVertical();
        }, 100);
      }
    },

    /**
     * When updating input's value
     *   1. Emit changes
     *   2. If value isn't the same as selected, set null
     *   3. Close dropdown if value is clear or else open it
     */
    newValue(value) {
      this.$emit("update:modelValue", value);
      // Check if selected is invalid
      const currentValue = this.getValue(this.selected);
      if (currentValue && !this.clearOnSelect && currentValue !== value) {
        this.setSelected(null, false);
      }
      // Close dropdown if input is clear or else open it
      if (this.hasFocus && (!this.openOnFocus || value)) {
        this.isActive = !!value;
      }
    },

    /**
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    modelValue(value) {
      this.newValue = value;
      // !this.isValid && this.$refs.input.checkHtml5Validity();
    },

    /**
     * Select first option if "keep-first
     */
    data(value) {
      // Keep first option always pre-selected
      if (this.keepFirst) {
        this.selectFirstOption(value);
      }
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("click", this.clickedOutside);
      window.addEventListener("resize", this.calcDropdownInViewportVertical);
    }
    if (this.preselected !== null) {
      this.selected = this.preselected;
      this.newValue = this.getValue(this.selected);
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("click", this.clickedOutside);
      window.removeEventListener("resize", this.calcDropdownInViewportVertical);
    }
  },
  methods: {
    /**
     * Create a new item based on input.
     */
    createItem() {
      this.$emit('create', this.newValue);
      this.isActive = false;
    },
    /**
     * Set which option is currently hovered.
     */
    setHovered(index) {
      this.hoveredIndex = index;
    },

    /**
     * Set which option is currently selected, update v-model,
     * update input value and close dropdown.
     */
    setSelected(option, closeDropdown = true) {
      if (option === undefined) return;

      this.selected = option;
      this.$emit("selected", this.selected);
      if (this.selected !== null) {
        this.newValue = this.clearOnSelect ? "" : this.getValue(this.selected);
      }
      closeDropdown &&
        this.$nextTick(() => {
          this.isActive = false;
        });
    },

    /**
     * Select first option
     */
    selectFirstOption(options) {
      this.$nextTick(() => {
        if (options.length) {
          // If has visible data or open on focus, keep updating the hovered
          if (
            this.openOnFocus ||
            (this.newValue !== "" && this.hovered !== options[0])
          ) {
            this.setHovered(0);
          }
        } else {
          this.setHovered(null);
        }
      });
    },

    /**
     * Enter key listener.
     * Select the hovered option.
     */
    enterPressed() {
      if (this.hovered === null) {
        if(this.newValue && this.allowCustom) {
          return this.setSelected(
      this.field? {[this.field]: this.newValue} : this.newValue
          )
        }
        return;
      }
      this.setSelected(this.hovered);
    },

    /**
     * Tab key listener.
     * Select hovered option if it exists, close dropdown, then allow
     * native handling to move to next tabbable element.
     */
    tabPressed() {
      if (this.hovered === null) {
        this.isActive = false;
        return;
      }
      this.setSelected(this.hovered);
    },

    /**
     * Close dropdown if clicked outside.
     */
    clickedOutside(event) {
      if (this.whiteList.indexOf(event.target) < 0) this.isActive = false;
    },

    /**
     * Return display text for the input.
     * If object, get value from path, or else just the value.
     */
    getValue(option) {
      if (!option) return;

      if (typeof this.customFormatter !== "undefined") {
        return this.customFormatter(option);
      }

      return typeof option === "object"
        ? getValueByPath(option, this.field)
        : option;
    },

    /**
     * Calculate if the dropdown is vertically visible when activated,
     * otherwise it is openened upwards.
     */
    calcDropdownInViewportVertical() {
      this.$nextTick(() => {
        /**
         * this.$refs.dropdown may be undefined
         * when Autocomplete is conditional rendered
         */
        if (this.$refs.dropdown === undefined) return;

        const rect = this.$refs.dropdown.getBoundingClientRect();

        this.isListInViewportVertically =
          rect.top >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight);
      });
    },

    /**
     * Arrows keys listener.
     * If dropdown is active, set hovered option, or else just open.
     */
    keyArrows(direction) {
      const sum = direction === "down" ? 1 : -1;
      if (this.isActive) {
        let index = this.filteredData.indexOf(this.hovered) + sum;
        index = index > this.filteredData.length - 1 ? this.filteredData.length : index;
        index = index < 0 ? 0 : index;

        this.$emit("active", this.filteredData[index]);

        this.setHovered(index);

        const list = this.$refs.dropdown.querySelector(".dropdown-content");
        const element = list.querySelectorAll(
          "a.dropdown-item:not(.is-disabled)"
        )[index];

        if (!element) return;

        const visMin = list.scrollTop;
        const visMax =
          list.scrollTop + list.clientHeight - element.clientHeight;

        if (element.offsetTop < visMin) {
          list.scrollTop = element.offsetTop;
        } else if (element.offsetTop >= visMax) {
          list.scrollTop =
            element.offsetTop - list.clientHeight + element.clientHeight;
        }
      } else {
        this.isActive = true;
      }
    },

    /**
     * Focus listener.
     * If value is the same as selected, select all text.
     */
    focused() {
      if (this.getValue(this.selected) === this.newValue) {
        this.$el.querySelector("input").select();
      }
      if (this.openOnFocus) {
        this.isActive = true;
        if (this.keepFirst) {
          this.selectFirstOption(this.data);
        }
      }
      this.hasFocus = true;
    },

    /**
     * Blur listener.
     */
    onBlur() {
      this.hasFocus = false;
    },
    onInput() {
      const currentValue = this.getValue(this.selected);
      if (currentValue && currentValue === this.newValue) return;
      this.$emit("typing", this.newValue);
    }
  }
};
</script>

<style scoped>
.autocomplete {
  position: relative;
}
.autocomplete.is-expanded,
.autocomplete.is-expanded input {
 width: 100%;
}

.autocomplete .dropdown-menu {
  display: block;
  min-width: 100%;
}

.autocomplete:not(.bottom-left):not(.bottom-right) .dropdown-menu {
  max-width: 100%;
}

.dropdown-menu {
  display: none;
  left: 0;
  min-width: 12rem;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  z-index: 20;
}

.autocomplete.top .dropdown-menu {
  top: auto;
  bottom: 100%;
  padding-bottom: 4px;
  padding-top: 0;
}

.autocomplete.bottom-left .dropdown-menu {
  top: 100%;
  padding-top: 4px;
  right: 0;
  left: auto
}

.autocomplete .dropdown-content {
  overflow: auto;
  max-height: 200px;
}

.dropdown-content {
  background: #fff;
  border-radius: 6px;
  padding: 0.75rem 0;
  min-width: 203px;
  font-weight: 500;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13);
}

a.dropdown-item {
  font-size: 16px;
  padding: 0.6rem 1.25rem;
  display: block;
  color: #525252;
  cursor: pointer;
}

a.dropdown-item:hover {
  background-color: var(--gray-200);
  color: var(--navy-700);
}

.autocomplete .dropdown-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.autocomplete .dropdown-item.is-hovered {
  background: var(--gray-300);
  color: var(--navy-700);
}
</style>
