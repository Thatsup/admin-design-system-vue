<template>
  <div>
    <input
      type="file"
      name="file"
      id="file"
      ref="file"
      class="inputfile"
      :value="computedValue"
      v-bind="$attrs"
      @change="onFileChange"
      :multiple="multiple"
    />

    <slot :props="{ files, computedFiles }">
      <div class="is-flex">
        <TadsButton blue href="#" @click="$refs.file.click()">
          <TadsIcon name="upload" size="18" />

          <template v-if="files.length === 1">
            {{ files[0].name }}
          </template>

          <template v-else-if="files.length > 1">
            {{ files.length }} files selected
          </template>

          <template v-else>
            Choose a file
          </template>
        </TadsButton>
      </div>
    </slot>
  </div>
</template>

<script>
import FormElementMixin from "../utils/FormElementMixin";
import TadsButton from "./Button";
import TadsIcon from "./Icon";

export default {
  name: "TadsFileUpload",
  components: { TadsIcon, TadsButton },
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    multiple: Boolean
  },
  data() {
    return {
      newValue: this.value,
      files: [],
      fileUrl: ""
    };
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Set internal value.
     */
    value(value) {
      this.newValue = value;
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        this.newValue = value;
        this.$emit("input", value);
      }
    },
    computedFiles() {
      let files = [];

      this.files.forEach(file => {
        files.push({
          name: file.name,
          url: URL.createObjectURL(file)
        });
      });

      return files;
    }
  },
  methods: {
    onFileChange(event) {
      this.files = event.target.files;

      this.$emit("input", {
        raw: this.files,
        files: this.computedFiles,
      });
    },
    /**
     * Input's 'input' event listener, 'nextTick' is used to prevent event firing
     * before ui update, helps when using masks (Cleavejs and potentially others).
     */
    onInput(event) {
      this.$nextTick(() => {
        if (event.target) {
          this.computedValue = event.target.value;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/sass/components/file-upload";
</style>
