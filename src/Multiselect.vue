<template>
  <div
      id="multiselect"
      ref="multiselect"
      :class="{'is-active': isActive, 'dropdown-open': dropdownOpen, 'is-disabled': disabled}"
      class="multiselect"
      :tabindex="tabindex"
      @focusin="activate"
      @focusout="deactivate"
  >

    <!-- search -->
    <template v-if="searchable && !disabled">
      <input
          ref="input"
          v-model="search"
          class="multiselect-search"
          type="text"
          @input="handleInput"
      />
    </template>

    <!-- placeholder -->
    <template v-if="placeholder && noSelection && !search">
      <slot name="placeholder">
        <div class="multiselect-placeholder">
          {{ placeholder }}
        </div>
      </slot>
    </template>

    <!-- Label -->
    <template v-if="!noSelection && !search">
      <slot :values="selectedValues" name="multipleLabel">
        <div class="multiselect-label">
          {{ multipleLabelText }}
        </div>
      </slot>
    </template>


    <!--option dropdown-->
    <div
        :class="{'is-hidden': !dropdownOpen}"
        class="multiselect-dropdown"
    >
      <ul class="multiselect-options">
        <li
            v-for="(option) in shownOptions"
            :key=option.value
            class=""
            @click="handleOptionClick(option)"
        >
          <slot :option="option" name="optionLabel">
            <span :class="{'is-selected': isSelected(option), 'is-hidden': isNotShown(option)}" class="multiselect-option">{{ option.label }}</span>
          </slot>
        </li>
      </ul>
    </div>


    <!-- clear -->
    <slot v-if="!noSelection && canClear && !disabled" :clear="clear" name="clear">
    <span class="multiselect-clear" @mousedown="clear"><span
        class="multiselect-clear-x"><!-- clear icon? --> x</span></span>
    </slot>

    <!-- space -->
    <div class="multiselect-spacer"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import useMultiselect from "./utils/useMultiselect";
import useDropdown from "./utils/useDropdown";
import useSearch from "./utils/useSearch";
import useOptions from "./utils/useOptions";
import useValue from "./utils/useValue";
import "./style/style.css"

export default defineComponent({
  name: 'Multiselect',
  emits: [
    'open', 'close', 'select', 'deselect',
    'search-change', 'update:modelValue', 'clear'
  ],
  props: {
    modelValue: {
      default: [],
    },
    selectOptions: {
      type: Array,
      required: false,
      default: () => ([])
    },
    placeholder: {
      type: String,
      required: false,
    },
    multipleLabel: {
      type: Function,
      required: false,
    },
    canClear: {
      type: Boolean,
      required: false,
      default: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    searchable: {
      type: Boolean,
      required: false,
      default: false,
    },
    closeOnSelect: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  computed: {},
  setup(props, context) {

    const value = useValue(props, context)
    const dropdown = useDropdown(props, context)
    const search = useSearch(props, context)
    const options = useOptions(props, context, {
      selectedValues: value.selectedValues,
      search: search.search,
      closeDropdown: dropdown.closeDropdown
    })
    const multiselect = useMultiselect(props, context, {
      selectedValues: value.selectedValues,
      selectedOptions: options.selectedOptions,
      openDropdown: dropdown.openDropdown,
      closeDropdown: dropdown.closeDropdown,
      clearSearch: search.clearSearch,
    })

    return {
      ...value,
      ...dropdown,
      ...search,
      ...options,
      ...multiselect,
    }

  }
})

</script>

<style>

</style>
