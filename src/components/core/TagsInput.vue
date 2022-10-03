<template>
  <div class="tag-input" :class="{ 'with-count': showCount }">
    <draggable
        v-model="tags"
        :item-key="sortableKey"
        :disabled="!sortable"
        class="tags input"
        :class="{'has-border': border}"
        animation="200"
    >
      <template #item="{element, index}">
        <TadsTag
            :class="{
              'duplicate': getTagId(element).toLowerCase() === duplicate,
              'cursor-move': !!sortable
            }"
            :can-delete="canDelete"
            :color="element.tagColor ? element.tagColor : tagsColor"
            @deleted="removeTag(index)"
        >{{ getTagName(element) }}</TadsTag>
      </template>
      <template v-if="options || allowCustom" #footer>
        <input
            v-if="!options"
            v-model="newTag"
            class="tags-input__input"
            autocomplete="off"
            @keydown.prevent.enter="addTag(newTag)"
            @keydown.prevent.tab="addTag(newTag)"
            @keydown.delete="deleteOnBackspace && !newTag.length && removeTag(tags.length - 1)"
            @change="addTag($event.target.value)"
            v-bind="$attrs"
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
              :backend="backend"
              open-on-focus
              clear-on-select
              expanded
              @keydown.delete="deleteOnBackspace && !newTag.length && removeTag(tags.length - 1)"
              @selected="addTag($event)"
          >
            <template v-if="$slots['autocomplete-item']" v-slot="{option}">
              <slot name="autocomplete-item" :option="option"/>
            </template>
          </Autocomplete>
        </span>
      </template>
    </draggable>
    <div v-if="showCount" class="count">
      <span>{{ tags.length }}</span> tags
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import TadsTag from "./Tag.vue";
import {isNull, isString} from "lodash";
import draggable from 'vuedraggable'
import Autocomplete from "../autocomplete/Autocomplete.vue";
import {get} from "lodash/object";

export default {
  name: 'TadsTagsInput',
  components: {Autocomplete, draggable,TadsTag},
  emits: ['update:modelValue'],
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Array, String],
    },
    options: {
      type: [Array, Boolean],
      default: false,
    },
    field: {
      type: String,
      default: null,
    },
    labelField: {
      type: String,
      default: null,
    },
    idField: {
      type: String,
      default: null,
    },
    tagsColor: {
      type: String,
      default: 'blue',
    },
    allowCustom: {
      type: Boolean,
      default: true,
    },
    showCount: {
      type: Boolean,
      default: false,
    },
    border: Boolean,
    sortable: Boolean,
    allowDuplicates: Boolean,
    backend: Boolean,
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
      default: ','
    }
  },
  setup(props, {emit}) {

    const newTag = ref("");
    const id = Math.random().toString(36).substring(7);

    const tags = computed({
      get() {
        let val = props.modelValue

        if (isNull(val)) {
          val = ''
        }

        if (isString(val)) {
          return val
              .split(props.glue)
              .map(v => v.trim())
              .filter(v => v !== '');
        }

        return val;
      },
      set(newVal) {
        if (isString(props.modelValue)) {
          emit('update:modelValue', newVal.join(props.glue))
        } else {
          emit('update:modelValue', newVal)
        }
      }
    })

    const isTagAnOption = tag => {
      return tag && props.options &&
          (
              typeof tag === 'object' ||
              props.options.includes(tag)
          );
    }

    const addTag = tag => {
      if (!tag) return;

      const tagIsAnOption = isTagAnOption(tag);
      // Only allow tags in options when allowCustom is false
      if (!props.allowCustom && !tagIsAnOption) {
        return
      }
      // Check for duplicate
      if (!props.allowDuplicates && tags.value.map(v => getTagId(v).toLowerCase()).includes(getTagId(tag).toLowerCase())) {
        handleDuplicate(getTagId(tag).toLowerCase());
        return;
      }

      // If a field is set, we are working with tag objects
      if (props.options && tagIsAnOption && availableOptions.value) {
        tag = availableOptions.value.find(o => getTagId(o) === getTagId(tag)) || tag;
      } else if(props.field || props.labelField || props.idField) {
        tag = {
          [props.idField || props.field]: getTagId(tag),
          [props.labelField || props.field]: getTagName(tag)
        };
      }
      tags.value = [ ...tags.value, tag ]

      newTag.value = "";
    };
    const removeTag = (index) => {
      if(!props.canDelete) {
        return;
      }
      const newTags = [ ...tags.value ];
      newTags.splice(index, 1);
      tags.value = newTags;
    };
    const getTagName = tag => {
      if(typeof tag === 'string') {
        return tag;
      }
      return props.labelField? get(tag, props.labelField) : (props.field? get(tag, props.field) : tag);
    }
    const getTagId = tag => {
      if(!tag) {
        return null;
      }
      if(typeof tag === 'string') {
        return tag;
      }
      return (props.idField? get(tag, props.idField) : (props.field? get(tag, props.field) : tag)).toString();
    }

    const sortableKey = tag => {
      return getTagId(tag)
    };

    // Handling duplicates – always in lowercase
    const duplicate = ref(null)
    const handleDuplicate = (tag) => {
      duplicate.value = tag
      setTimeout(() => (duplicate.value = null), 1000)
      newTag.value = ""
    };

    // Options
    const availableOptions = computed(() => {
      if (!props.options) return false;
      const tagIds = tags.value.map((tag) => getTagId(tag));
      return props.options.filter((option) => !tagIds.includes(getTagId(option)));
    });

    return {
      tags,
      newTag,
      addTag,
      removeTag,
      getTagName,
      getTagId,
      availableOptions,
      id,
      duplicate,
      sortableKey
    };
  },
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
  min-height: var(--input-height);
  background: white;
  padding-top: 6px; /* @TODO Maybe use a CSS variable in input.css? */
  padding-bottom: 6px; /* @TODO Maybe use a CSS variable in input.css? */
}

.tag-input ::v-deep(.tag) {
  margin: 1px;
}

.sortable-ghost {
  opacity: 0.5;
}

.tag-input ::v-deep(.tags-input__input) {
  border: 0;
  background: #0000;
  box-shadow: none;
  outline: 0;
  margin-left: 4px;
  padding: 6px;
  flex: 1;
  min-width: 70px;
  width: 100%;
  font-size: 14px;
  line-height: 16px;
}

.tag-input ::v-deep(.tags-input__input::placeholder) {
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

.tag-input ::v-deep(.tag.duplicate) {
  animation: shake 1s;
  color: var(--red-600);
  background: rgba(239, 102, 102, 0.25);
}
.tag-input ::v-deep(.tag.duplicate::before) {
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
