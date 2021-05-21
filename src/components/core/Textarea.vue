<template>
  <textarea
    class="input"
    :class="{
      'is-loading': loading,
      'has-error': hasError,
      'full-width': expanded,
      transparent: transparent
    }"
    :value="value"
    rows="1"
    v-on="listeners"
  />
</template>

<script>
export default {
  name: "TadsTextarea",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    loading: Boolean,
    transparent: Boolean,
    expanded: Boolean
  },
  data() {
    return {
      hasError: false
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => {
          let value = event.target.value;

          if (this.$attrs.type === "number") {
            value = parseInt(value, 10);
          }

          this.$emit("input", value);
        }
      };
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/sass/components/input.scss";
</style>

<style scoped>
.input {
  max-width: 100%;
  min-width: 100%;
  height: auto;

  border: 1px solid transparent;
  border-radius: var(--radius);
  color: var(--navy-700);
  box-shadow: none;
  display: inline-flex;
  font-size: 16px;
  font-family: inherit;
  line-height: 1.5;
  padding: 8px 15px;
  position: relative;
}
</style>