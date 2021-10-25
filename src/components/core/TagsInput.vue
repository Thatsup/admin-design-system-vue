<template>
  <div class="tag-input" :class="{ 'with-count': showCount }">
    <datalist v-if="options" :id="id">
      <option v-for="option in availableOptions" :key="option" :value="getTagName(option)">
        {{ getTagName(option) }}
      </option>
    </datalist>

    <div class="input tags" :class="{'has-border': border}" ref="tagsUl">
      <span
          v-for="(tag, index) in tags"
          :key="tag"
      >
        <TadsTag
            :class="{ duplicate: getTagName(tag).toLowerCase() === duplicate}"
            :can-delete="true"
            @click="removeTag(index)"
            :color="tag.tagColor ? tag.tagColor : tagsColor"
        >{{ getTagName(tag) }}</TadsTag>
      </span>

      <input
          v-model="newTag"
          :list="id"
          class="tags-input__input"
          autocomplete="off"
          @keydown.prevent.enter="addTag(newTag)"
          @keydown.prevent.tab="addTag(newTag)"
          @keydown.delete="newTag.length || removeTag(tags.length - 1)"
          v-bind="$attrs"
      />
    </div>
    <div v-if="showCount" class="count">
      <span>{{ tags.length }}</span> tags
    </div>
  </div>
</template>
<script>
import {ref, watch, nextTick, onMounted, computed, toRefs} from "vue";
import TadsTag from "./Tag";
import {isString} from "lodash/lang";

export default {
  name: 'TadsTagsInput',
  components: {TadsTag},
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
      default: '',
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
  },
  setup(props, {emit}) {
    // Tags
    const tags = ref([]);
    const newTag = ref("");
    const id = Math.random().toString(36).substring(7);
    const { modelValue } = toRefs(props)

    watch(modelValue, (val) => {
      if (isString(val)) {
        tags.value = val
            .split(',')
            .map(v => v.trim())
            .filter(v => v !== '');
      } else {
        tags.value = val
      }
    }, {deep: true, immediate: true})

    const isTagAnOption = tagName => {
      return props.options.some(option => {
        return props.field ? option[props.field] === tagName : option === tagName;
      });
    }

    const addTag = tagName => {
      if (!tagName) return;

      // Only allow tags in options when allowCustom is false
      if (!props.allowCustom && !isTagAnOption(tagName)) {
        return
      }

      // Check for duplicate
      if (tags.value.map(v => getTagName(v).toLowerCase()).includes(tagName.toLowerCase())) {
        handleDuplicate(tagName.toString().toLowerCase());
        return;
      }

      // If a field is set, we are working with tag objects
      if (props.field === '') {
        tags.value = [...tags.value, tagName]
      } else {
        tags.value = [...tags.value, {
          [props.field]: tagName
        }]
      }

      newTag.value = "";
    };
    const removeTag = (index) => {
      tags.value.splice(index, 1);
    };
    const getTagName = tag => {
      return props.field !== '' ? tag[props.field] : tag
    }

    // Handling duplicates – always in lowercase
    const duplicate = ref(null)
    const handleDuplicate = (tag) => {
      duplicate.value = tag
      setTimeout(() => (duplicate.value = null), 1000)
      newTag.value = ""
    };

    // Positioning and handling tag change
    const tagsUl = ref(null);
    const onTagsChange = () => {
      if (isString(props.modelValue)) {
        emit('update:modelValue', tags.value.join(','))
      } else {
        emit('update:modelValue', tags.value)
      }
    };
    watch(tags, () => nextTick(onTagsChange), {deep: true});
    onMounted(onTagsChange);

    // Options
    const availableOptions = computed(() => {
      if (!props.options) return false;
      return props.options.filter((option) => !tags.value.includes(option));
    });

    return {
      tags,
      newTag,
      addTag,
      removeTag,
      getTagName,
      tagsUl,
      availableOptions,
      id,
      duplicate,
    };
  },
};
</script>
<style scoped>
.tag-input {
  position: relative;
}

.tags {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  height: auto;
  background: white;
  padding-top: 8px; /* @TODO Maybe use a CSS variable in input.css? */
  padding-bottom: 8px; /* @TODO Maybe use a CSS variable in input.css? */
}

.tags .tag {
  margin: 1px;
}

.tags-input__input {
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
}

.tags-input__input::placeholder {
  font-style: italic;
  color: var(--gray-500);
}

ul {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  max-width: 75%;
  overflow-x: auto;
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

.tag.duplicate {
  animation: shake 1s;
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
</style>
