<template>
  <div
      id="multiselect"
      ref="multiselect"
      :class="classList.container"
      :tabindex="tabindex"
      data-cy="multiselect"
      @focusin="activate"
      @focusout="deactivate"
      @mousedown="handleMousedown"
  >


    <select v-model="selectedValues" :multiple="multiple" class="hidden"/>

    <!-- search -->
    <template v-if="searchable && !disabled">
      <input
          ref="input"
          v-model="search"
          :class="classList.search"
          :type="inputType"
          data-cy="searchInput"
          @input="handleInput"
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

    <!-- Single label   -->
    <template v-if="!multiple && !noSelection && !search && selectedOptions">
      <slot name="singlelabel" :value="selectedOptions">
        <div :class="classList.label" data-cy="single-label">
          {{ selectedOptions[label] }}
        </div>
      </slot>
    </template>

    <!-- Multiple label -->
    <template v-if="multiple && !noSelection && !search">
      <slot name="multipleLabel" :selectedOptions="selectedOptions">
        <div :class="classList.label" data-cy="multiple-label">
          {{ multipleLabelText }}
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
            data-cy="option"
            @click="handleOptionClick(option)"
        >
          <slot :isSelected="isSelected" :option="option" name="optionLabel">
            <span data-cy="optionLabel"
            >{{ option.label }}</span>
          </slot>
        </li>
      </ul>

      <slot v-if="noOptions" name="no-options">
        <div :class="classList.noOptions" v-html="noOptionsText"/>
      </slot>

      <slot v-if="noResults" name="no-results">
        <div :class="classList.noResults" v-html="noResultsText"/>
      </slot>

    </div>

    <!-- clear -->
    <slot v-if="!noSelection && canClear && !disabled" :clear="clear" name="clear">
    <span :class="classList.clear" data-cy="clear" @mousedown="clear"><span
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
import type {Classes, Option} from "./types";
import * as _ from "lodash";


export default defineComponent({
  name: 'SMultiselect',
  emits: [
    'open', 'close', 'select', 'deselect',
    'search-change', 'update:modelValue', 'clear'
  ],
  props: {
    /**
     * Allows selecting multiple options. If true, the model value will be an array of selected values,
     * otherwise it is a single value.
     */
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Is the value, that's used externally.
     */
    modelValue: {
      type: [String, Number, Array, Object, Boolean],
      required: false,
      default: (props: any) => props.multiple ? [] : null
    },
    /**
     * Array of options that can be selected.
     * An Option should look like this:
     * <pre><code>
     *   {value: \<any>, label: \<String>, ...}.
     * </code></pre>
     */
    selectOptions: {
      type: Array as PropType<Option[]>,
      required: false,
      default: () => ([])
    },
    /**
     * Text that is displayed if no options are given.
     */
    noOptionsText: {
      type: String,
      required: false,
      default: 'Die Liste ist leer'
    },
    /**
     * The placeholder string will be displayed if no option is selected.
     */
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Determines which value of the selected option Object should be displayed as label.
     */
    label: {
      type: String,
      required: false,
      default: 'label'
    },
    /**
     * Alters the displayed label if multiple selection mode is active.
     * Can be a string or a function returning a string.
     * The passed parameter of the function is an array of the selected options.
     * By default it displays the amount of selected options
     */
    multipleLabel: {
      type: [Function, String] as PropType<((options: Array<Option>) => string) | string>,
      required: false,
      default: undefined
    },
    /**
     * Allows clearing all selected options
     */
    canClear: {
      type: Boolean,
      required: false,
      default: true,
    },
    /**
     * Disables the component. Values can still be pushed into model value externally.
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Allows searching options.
     */
    searchable: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Input type of the search input.
     */
    inputType: {
      type: String,
      required: false,
      default: 'text',
    },
    /**
     * The value of the option object which is searched if searchable is true. Searches the options labels by default.
     */
    trackBy: {
      type: String,
      required: false,
      default: 'label'
    },
    /**
     * Text that is displayed if there are no search results.
     */
    noResultsText: {
      type: String,
      required: false,
      default: 'Keine Ergebnisse gefunden'
    },
    /**
     * The selection dropdown will be automatically closed after selecting/deselecting an option if this prop is set to true.
     */
    closeOnSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Used to style the component via tailwind classes. To alter only a few tings like color or size of single elements,
     * import baseStyle from 'src/utils/defaultTheme' and use it like this:
     * <pre><code>
     * :classes={
     *   container: [baseStyle.container, 'bg-gray-100'],
     *   option: [baseStyle.option, 'bg-white text-black h-5'],
     *   ...
     * }
     * </code></pre>
     * Tailwind classes won't overwrite the basic style though, so already existing styles
     * in the baseStyle can't be changed with this method.
     * To completely restyle the elements you can just ignore the baseStyle.
     * The following classes can be used:
     * <pre><code>
     *   container,
     *   containerDisabled,
     *   containerOpen,
     *   containerActive,
     *   label,
     *   search,
     *   placeholder,
     *   clear,
     *   clearCross,
     *   dropdown,
     *   dropdownHidden,
     *   options,
     *   option,
     *   optionSelected,
     *   optionNotShown,
     *   spacer
     * </code></pre>
     */
    classes: {
      type: Object as PropType<Classes>,
      required: false,
      default: () => ({})
    }
  },
  watch: {
    selectOptions(newOptions, oldOptions) {
      if (newOptions && newOptions.length > 0) {
        for (const option of oldOptions) {
          if (!_.some(newOptions, option) && this.isSelected(option)) {
            this.deselect(option)
          }
        }
      } else {
        this.clear()
      }
    }
  },
  computed: {},
  setup(props, context) {
    const value = useValue(props, context)
    const dropdown = useDropdown(props, context)
    const search = useSearch(props, context)
    const multiselect = useMultiselect(props, context, {
      selectedValues: value.selectedValues,
      dropdownOpen: dropdown.dropdownOpen,
      openDropdown: dropdown.openDropdown,
      closeDropdown: dropdown.closeDropdown,
      clearSearch: search.clearSearch,
    })
    const options = useOptions(props, context, {
      search: search.search,
      selectedValues: value.selectedValues,
      deactivate: multiselect.deactivate,
    })
    const classList = useClasses(props, context, {
      dropdownOpen: dropdown.dropdownOpen,
      isSelected: options.isSelected,
      isActive: multiselect.isActive,
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
