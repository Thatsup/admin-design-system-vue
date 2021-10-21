<template>
  <div>
    <input
      type="file"
      name="file"
      id="file"
      ref="file"
      class="file-upload"
      :value="computedValue"
      v-bind="$attrs"
      @change="onFileChange"
      :multiple="multiple"
      tabindex="-1"
    />

    <slot :props="{ files, computedFiles }">
      <div class="is-flex">
        <Button blue icon="upload" @click="$refs.file.click()">
          <template v-if="computedFiles.length === 1">
            {{ computedFiles[0].name }}
          </template>

          <template v-else-if="computedFiles.length > 1">
            {{ computedFiles.length }} files selected
          </template>

          <template v-else>
            {{ label }}
          </template>
        </Button>
      </div>
    </slot>
  </div>
</template>

<script>
import Button from "./Button"
import Icon from "./Icon"
import './file-upload.css'

export default {
  name: "TadsFileUpload",
  inheritAttrs: false,
  components: { Icon, Button },
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: 'Choose a file'
    },
    multiple: Boolean,
  },
  data() {
    return {
      newValue: this.modelValue,
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
      return Array.from(this.files).map(file => {
        return {
          name: file.name,
          url: URL.createObjectURL(file)
        }
      })
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
