<template>
  <div
      id="multiselect"
      ref="multiselect"
      :class="classList.container"
      :tabindex="tabindex"
      @focusin="activate"
      @focusout="deactivate"
      data-cy="multiselect"
  >


    <select v-model="selectedValues" :multiple="multiple" class="hidden"/>

    <!-- search -->
    <template v-if="searchable && !disabled">
      <input
          ref="input"
          v-model="search"
          :type="inputType"
          :class="classList.search"
          @input="handleInput"
          data-cy="searchInput"
      />
    </template>

    <!-- placeholder -->
    <template v-if="placeholder && noSelection && !search">
      <slot name="placeholder">
        <div :class="classList.placeholder" data-cy="placeholder">
          {{ placeholder }}
        </div>
      </slot>
    </template>

    <!-- Label -->
    <template v-if="!noSelection && !search">
      <slot :values="selectedValues" name="label">
        <div :class="classList.label" data-cy="label">
          {{ labelText }}
        </div>
      </slot>
    </template>


    <!--option dropdown-->
    <div
        :class="classList.dropdown"
        data-cy="dropdown"
    >
      <ul :class="classList.options" data-cy="optionList">
        <li
            v-for="(option) in shownOptions"
            :key=option.value
            :class="classList.option(option)"
            @click="handleOptionClick(option)"
            data-cy="option"
        >
          <slot :option="option" name="optionLabel">
            <span data-cy="optionLabel"
            >{{ option.label }}</span>
          </slot>
        </li>
      </ul>
    </div>


    <!-- clear -->
    <slot v-if="!noSelection && canClear && !disabled" :clear="clear" name="clear">
    <span :class="classList.clear" @mousedown="clear" data-cy="clear"><span
        :class="classList.clearCross"><!-- clear icon? --> x</span></span>
    </slot>

    <!-- space -->
    <div :class="classList.spacer" data-cy="spacer"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import useMultiselect from "./utils/useMultiselect";
import useDropdown from "./utils/useDropdown";
import useSearch from "./utils/useSearch";
import useOptions from "./utils/useOptions";
import useValue from "./utils/useValue";
import useClasses from "./utils/useClasses";
import Classes from "./types/classes.type";


export default defineComponent({
  name: 'Multiselect',
  emits: [
    'open', 'close', 'select', 'deselect',
    'search-change', 'update:modelValue', 'clear'
  ],
  props: {
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    modelValue: {
      required: false,
      default: (props: any) => props.multiple ? [] : null
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
      type: [Function, String],
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
    },
    inputType: {
      type: String,
      required: false,
      default: 'text',
    },
    classes: {
      type: Object as PropType<Classes>,
      required: false,
      default: () => ({})
    }
  },
  computed: {},
  setup(props, context) {
    const value = useValue(props, context)
    const dropdown = useDropdown(props, context)
    const search = useSearch(props, context)
    const options = useOptions(props, context, {
      selectedValues: value.selectedValues,
      closeDropdown: dropdown.closeDropdown,
    })
    const multiselect = useMultiselect(props, context, {
      selectedValues: value.selectedValues,
      selectedOptions: options.selectedOptions,
      openDropdown: dropdown.openDropdown,
      closeDropdown: dropdown.closeDropdown,
      clearSearch: search.clearSearch,
    })
    const classList = useClasses(props, context, {
      dropdownOpen: dropdown.dropdownOpen,
      isSelected: options.isSelected,
      isActive: multiselect.isActive,
      search: search.search
    })

    return {
      ...value,
      ...dropdown,
      ...search,
      ...options,
      ...multiselect,
      ...classList,
    }

  }
})

</script>

<style>

</style>
