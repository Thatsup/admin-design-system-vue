<template>
  <div>
    <input
        type="file"
        name="file"
        id="file"
        ref="file"
        class="image-upload"
        @change="onFileChange"
        tabindex="-1"
        :multiple="multiple"
    />

    <div
        v-bind="$attrs"
        class="image-upload__dropzone"
        :class="{'image-upload__dropzone--dragging': isDraggingOver}"
        @click="$refs.file.click()"
        @drop.prevent="onDropFile"
        @dragover.prevent.stop="onDragOver"
        @dragleave.prevent.stop="onDragLeave"
    >
      <span v-if="hasImage" class="image-upload__dropzone__delete">
        <TadsButton
            small
            red
            icon="delete"
            @click.stop="deleteFile"
        />
      </span>

      <div>
        <template v-if="hasImage && !isDraggingOver">
          <img
              class="image-upload__dropzone__image"
              :src="computedFiles.length ? computedFiles[0].url : src"
          >
        </template>

        <template v-else>
          <span @dragover.prevent @drag.prevent v-if="isDraggingOver">Drop it like it's hot</span>
          <span v-else class="text-sm leading-normal">Drag or click to upload</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import TadsButton from "./Button.vue"
import './image-upload.css'

export default {
  name: "TadsImageUpload",
  inheritAttrs: false,
  components: {TadsButton},
  emits: ['delete', 'upload'],
  props: {
    src: String,
    multiple: Boolean,
    clearUpload: Boolean,
    modelValue: {
      type: [String, Number],
      default: ""
    },
  },
  data() {
    return {
      files: [],
      isDraggingOver: false,
    };
  },
  computed: {
    hasImage() {
      return !!(this.computedFiles.length || this.src)
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
    deleteFile() {
      this.files = []
      this.$emit('delete')
    },
    onDragLeave() {
      this.isDraggingOver = false
    },
    onDragOver() {
      this.isDraggingOver = true
    },
    onDropFile(e) {
      this.files = e.dataTransfer.files
      this.isDraggingOver = false
      this.$emit("upload", this.files);

      if (this.clearUpload) {
        this.deleteFile()
      }
    },
    onFileChange(event) {
      this.files = event.target.files;
      this.$emit("upload", this.files);

      if (this.clearUpload) {
        this.deleteFile()
      }
    },
  }
};
</script>
