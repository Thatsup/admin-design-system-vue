<template>
  <div class="tag-input" :class="{ 'with-count': showCount }">
    <draggable
      v-model="tags"
      :disabled="!sortable"
      class="tags input"
      :class="{ 'has-border': border }"
    >
      <div v-for="(element, index) in tags" :key="sortableKey(element)">
        <TadsTag
          :class="{
            duplicate: getTagId(element).toLowerCase() === duplicate,
            'cursor-move': !!sortable
          }"
          :can-delete="canDelete"
          :color="element.tagColor ? element.tagColor : tagsColor"
          @deleted="removeTag(index)"
          >{{ getTagName(element) }}</TadsTag
        >
      </div>

      <template #footer>
        <TadsInput
          v-if="!options"
          v-model="newTag"
          class="tags-input__input"
          autocomplete="off"
          @keydown.prevent.enter="addTag(newTag)"
          @keydown.prevent.tab="addTag(newTag)"
          @keydown.delete="
            deleteOnBackspace && !newTag.length && removeTag(tags.length - 1)
          "
          v-bind="$attrs"
          :expanded="false"
          small
        />
        <span v-else style="flex:1">
          <Autocomplete
            v-model="newTag"
            :data="availableOptions"
            :field="labelField || field"
            :allow-custom="allowCustom"
            style="height: auto; line-height: normal;"
            v-bind="$attrs"
            class="tags-input__input"
            small
            open-on-focus
            clear-on-select
            expanded
            @keydown.delete="
              deleteOnBackspace && !newTag.length && removeTag(tags.length - 1)
            "
            @selected="addTag($event)"
          />
        </span>
      </template>
    </draggable>
    <div v-if="showCount" class="count">
      <span>{{ tags.length }}</span> tags
    </div>
  </div>
</template>
<script>
import TadsTag from "./Tag.vue";
import { isNull, isString } from "lodash";
import draggable from "vuedraggable";
import Autocomplete from "../autocomplete/Autocomplete";
import { get } from "lodash/object";
import TadsInput from "./Input.vue";

export default {
  name: "TadsTagsInput",
  components: { TadsInput, Autocomplete, draggable, TadsTag },
  emits: ["update:modelValue"],
  inheritAttrs: false,
  props: {
    value: {
      type: [Array, String]
    },
    options: {
      type: [Array, Boolean],
      default: false
    },
    field: {
      type: String,
      default: null
    },
    labelField: {
      type: String,
      default: null
    },
    idField: {
      type: String,
      default: null
    },
    tagsColor: {
      type: String,
      default: "blue"
    },
    allowCustom: {
      type: Boolean,
      default: true
    },
    showCount: {
      type: Boolean,
      default: false
    },
    border: Boolean,
    sortable: Boolean,
    allowDuplicates: Boolean,
    canDelete: {
      type: Boolean,
      default: true
    },
    deleteOnBackspace: {
      type: Boolean,
      default: true
    },
    glue: {
      type: String,
      default: ","
    }
  },
  data() {
    return {
      newTag: "",
      duplicate: null,
      id: Math.random()
        .toString(36)
        .substring(7)
    };
  },
  computed: {
    tags: {
      get() {
        let val = this.value;

        if (isNull(val)) {
          val = "";
        }

        if (isString(val)) {
          return val
            .split(this.glue)
            .map(v => v.trim())
            .filter(v => v !== "");
        }

        return val;
      },
      set(newVal) {
        if (isString(this.value)) {
          this.$emit("input", newVal.join(this.glue));
        } else {
          this.$emit("input", newVal);
        }
      }
    },
    availableOptions() {
      if (!this.options) return false;
      const tagIds = this.tags.map(tag => this.getTagId(tag));
      return this.options.filter(
        option => !tagIds.includes(this.getTagId(option))
      );
    }
  },

  methods: {
    isTagAnOption(tag) {
      return (
        tag &&
        this.options &&
        (typeof tag === "object" || this.options.includes(tag))
      );
    },

    addTag(tag) {
      if (!tag) return;

      const tagIsAnOption = this.isTagAnOption(tag);
      // Only allow tags in options when allowCustom is false
      if (!this.allowCustom && !tagIsAnOption) {
        return;
      }
      // Check for duplicate
      if (
        !this.allowDuplicates &&
        this.tags
          .map(v => this.getTagId(v).toLowerCase())
          .includes(this.getTagId(tag).toLowerCase())
      ) {
        this.handleDuplicate(this.getTagId(tag).toLowerCase());
        return;
      }

      // If a field is set, we are working with tag objects
      if (this.options && tagIsAnOption && this.availableOptions) {
        tag =
          this.availableOptions.find(
            o => this.getTagId(o) === this.getTagId(tag)
          ) || tag;
      } else if (this.field || this.labelField || this.idField) {
        tag = {
          [this.idField || this.field]: this.getTagId(tag),
          [this.labelField || this.field]: this.getTagName(tag)
        };
      }
      this.tags = [...this.tags, tag];

      this.newTag = "";
    },
    removeTag(index) {
      if (!this.canDelete) {
        return;
      }
      const newTags = [...this.tags];
      newTags.splice(index, 1);
      this.tags = newTags;
    },
    getTagName(tag) {
      if (typeof tag === "string") {
        return tag;
      }
      return this.labelField
        ? get(tag, this.labelField)
        : this.field
        ? get(tag, this.field)
        : tag;
    },
    getTagId(tag) {
      if (!tag) {
        return null;
      }
      if (typeof tag === "string") {
        return tag;
      }
      return (this.idField
        ? get(tag, this.idField)
        : this.field
        ? get(tag, this.field)
        : tag
      ).toString();
    },

    sortableKey(tag) {
      return this.getTagId(tag);
    },

    handleDuplicate(tag) {
      this.duplicate = tag;
      setTimeout(() => (this.duplicate = null), 1000);
      this.newTag = "";
    }
  }
};
</script>
<style scoped>
.tag-input {
  position: relative;
}

.tag-input .tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: auto;
  min-height: 42px;
  background: white;
  padding-top: 6px;
  padding-bottom: 6px;
  border-radius: 4px;
  padding-left: 12px;
}

.tag-input >>> .tag {
  margin: 1px;
}

.sortable-ghost {
  opacity: 0.5;
}

.tag-input >>> .tags-input__input {
  border: 0;
  background: #0000;
  box-shadow: none;
  outline: 0;
  margin-left: 4px;
  padding: 6px;
  flex: 1;
  min-width: 70px;
  width: auto;
  font-size: 14px;
  line-height: 16px;
}

.tag-input >>> .tags-input__input::placeholder {
  font-style: italic;
  color: var(--gray-500);
}

@keyframes shake {
  10%,
  90% {
    transform: scale(0.9) translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: scale(0.9) translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: scale(0.9) translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: scale(0.9) translate3d(4px, 0, 0);
  }
}

.tag-input >>> .tag.duplicate {
  animation: shake 1s;
  color: var(--red-600);
  background: rgba(239, 102, 102, 0.25);
}
.tag-input >>> .tag.duplicate::before {
  background-color: var(--red-600);
}

.count {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  display: block;
  font-size: 0.8rem;
  white-space: nowrap;
}

.count span {
  background: var(--gray-300);
  padding: 2px 3px;
  border-radius: 2px;
}

.with-count input {
  padding-right: 60px;
}

.with-count ul {
  max-width: 60%;
}
.cursor-move {
  cursor: move;
}
</style>
