<template>
  <component
    :is="is"
    class="button"
    :class="buttonClasses"
    v-bind="{...customAttrs, ...$attrs}"
    @click="onHandlerClick"
  >
    <TadsIcon
      v-if="icon"
      :name="icon"
      :size="iconSize"
      :rotate="iconRotate"
      class="button__icon"
    />

    <span class="button__label" v-if="label || $slots.default">
        <slot v-if="!label" />
        {{ label }}
    </span>
  </component>
</template>

<script>
import "./button.css"
import "../../assets/styles/loading.css"
import TadsIcon from "./Icon.vue";

export default {
  name: "TadsButton",
  inheritAttrs: false,
  components: { TadsIcon },
  props: {
    expanded: Boolean,
    loading: Boolean,
    outlined: Boolean,

    label: String,
    icon: String,
    iconRotate: {
      type: Number,
      default: 0
    },

    // Sizes
    small: Boolean,
    large: Boolean,

    // Colors
    color: {
      type: String,
      default: 'blue',
      validator(value) {
        return ['gray', 'blue', 'green', 'yellow', 'orange', 'navy', 'red', 'white'].indexOf(value) !== -1;
      }
    },

    handler: {
      type: Function[Promise],
      required: false,
      default: null
    }
  },
  data() {
    return {
      loadingLocal: false
    };
  },
  methods: {
    onHandlerClick() {
      if (this.href) return

      if (this.handler && typeof this.handler === "function") {
        const handler = this.handler();

        if (handler instanceof Promise) {
          this.loadingLocal = true

          return handler
            .finally(() => {
              this.loadingLocal = false
            });
        }

        return handler
      }
    }
  },
  computed: {
    buttonClasses() {
      return {
        "button--fullwidth": this.expanded,
        "button--outlined": this.outlined,
        "is-loading": this.loading || this.loadingLocal,

        // Sizes
        "is-small": this.small,
        "is-large": this.large,

        ['color-' + this.color]: this.color
      };
    },
    customAttrs() {
      if (this.is === 'button') {
        return {
          type: 'button'
        }
      }

      return null
    },
    iconSize() {
      if (this.small) return 14
      if (this.large) return 18
      return 16
    },
    is() {
      return this.$attrs['href'] ? 'a' : 'button'
    }
  }
};
</script>
