<template>
  <div
    ref="multiselect"
    :class="classList.container"
    :tabindex="tabindex"
    data-cy="multiselect"
    @focusin="activate"
    @focusout="deactivate"
    @focus="handleFocus"
    @mousedown.self="handleMousedown"
  >
    <select
      v-model="selectedOptionsRef"
      :multiple="multiple"
      v-bind="selectProps"
      class="hidden"
    />

    <!-- search -->
    <template v-if="searchable && !disabled">
      <input
        ref="input"
        v-model="search"
        :class="classList.search"
        v-bind="searchProps"
        data-cy="search-input"
      >
    </template>

    <!-- placeholder -->
    <template v-if="placeholder && noSelection && !search">
      <slot name="placeholder">
        <div
          :class="classList.placeholder"
          data-cy="placeholder"
        >
          {{ placeholder }}
        </div>
      </slot>
    </template>

    <!-- display selected values -->
    <template v-if="!noSelection && !search">
      <slot
        name="value-display"
        :selected-options="selectedOptions"
      >
        <div
          :class="classList.label"
          data-cy="value-display"
        >
          {{ valueDisplayText }}
        </div>
      </slot>
    </template>

    <!--option dropdown-->
    <div
      :class="classList.dropdown"
      data-cy="dropdown"
      @scroll="handleScroll"
    >
      <ul
        v-if="shownOptions.length > 0 && (!loadingOptions || infinite)"
        :class="classList.options"
        data-cy="optionList"
      >
        <li
          v-for="(option) in shownOptions"
          :key="optionValue(option)"
          :class="classList.option(option)"
          data-cy="option"
          @click="handleOptionClick(option)"
        >
          <slot
            :is-selected="isSelected"
            :option="option"
            name="option-label"
          >
            <span data-cy="option-label">{{ optionLabel(option) }}</span>
          </slot>
        </li>
      </ul>

      <slot
        v-if="loadingOptions"
        name="loading-options"
      >
        <hr>
        <div class="flex justify-center items-center py-2">
          <div
            :class="classList.spinner"
            data-cy="spinner"
          />
        </div>
      </slot>

      <slot
        v-if="noOptions && !loadingOptions"
        name="no-options"
      >
        <div
          :class="classList.noOptions"
        >
          {{ noOptionsText }}
        </div>
      </slot>

      <slot
        v-if="noResults && !loadingOptions"
        name="no-results"
      >
        <div
          :class="classList.noResults"
        >
          {{ noResultsText }}
        </div>
      </slot>
    </div>

    <!-- clear -->
    <slot
      v-if="!noSelection && clearable && !disabled"
      :clear="clear"
      name="clear"
    >
      <span
        :class="classList.clear"
        data-cy="clear"
        @mousedown="clear"
      ><span
        :class="classList.clearIcon"
      ><!-- clear icon? --> x</span></span>
    </slot>

    <!-- space -->
    <div
      :class="classList.spacer"
      data-cy="spacer"
    />
  </div>
</template>

<script lang="ts">
import type {InputHTMLAttributes, PropType, SelectHTMLAttributes, SetupContext} from 'vue'
import {defineComponent, toRefs} from 'vue'
import useMultiselect from './utils/useMultiselect'
import useDropdown from './utils/useDropdown'
import useSearch from './utils/useSearch'
import useOptions from './utils/useOptions'
import useClasses from './utils/useClasses'
import type {Classes, Option} from './types'
import useScroll from './utils/useScroll'
export default defineComponent({
  name: 'SMultiselect',
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
      type: Object as PropType<unknown>,
      required: false,
      default: (props: {multiple: boolean}) => props.multiple ? [] as unknown[] : undefined as unknown,
    },
    /**
     * Array of options that can be selected.
     * An Option should look like this:
     * <pre><code>
     *   {value: \<any>, label: \<String>, ...}.
     * </code></pre>
     */
    selectOptions: {
      type: Array as PropType<Array<Option | unknown>>,
      required: false,
      default: () => ([]),
    },
    /**
     * Function that determines which attribute of the option object should be used as value.
     * The passed parameters are an option and an array of all selected options.
     * By default, it returns the value attribute of the passed option.
     */
    optionValue: {
      type: Function as PropType<(option: Option | unknown) => unknown>,
      required: false,
      default: (option: Option | unknown) => {
        if (option)
          return (option as Option).value
        else
          return null
      },
    },
    /**
     * Text that is displayed if no options are given.
     */
    noOptionsText: {
      type: String,
      required: false,
      default: 'The list is empty.',
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
     * Function that determines which attribute of the option object should be displayed as label.
     * The passed parameters are an option and an array of all selected options.
     * By default, it returns the label attribute of the passed option.
     */
    optionLabel: {
      type: Function as PropType<((option: Option | unknown, selectedOptions?: Array<Option | unknown>) => string)>,
      required: false,
      default: (option: Option | unknown) => {
        if (option)
          return (option as Option).label
        else
          return ''
      },
    },
    /**
     * Function which determines if an option is disabled.
     * The passed parameters are an option and an array of all selected options.
     * By default, it returns the disabled attribute of the passed option.
     */
    optionDisabled: {
      type: Function as PropType<((option: Option | unknown, selectedOptions?: Array<Option | unknown>) => boolean)>,
      required: false,
      default: (option: Option | unknown) => {
        return (option as Option).disabled
      },
    },
    /**
     * Alters the displayed label if multiple selection mode is active.
     * Can be a string or a function returning a string.
     * The passed parameter of the function is an array of the selected options.
     * By default, it displays the amount of selected options
     */
    displaySelectedValues: {
      type: [Function, String] as PropType<((options: Array<Option | unknown>) => string) | string>,
      required: false,
      default: undefined,
    },
    /**
     * Allows clearing all selected options
     */
    clearable: {
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
     * Allows passing HTML select attributes to the hidden select element.
     */
    selectProps: {
      type: Object as PropType<SelectHTMLAttributes>,
      required: false,
      default: undefined,
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
     * Allows passing HTML input attributes to the search input element.
     */
    searchProps: {
      type: Object as PropType<InputHTMLAttributes>,
      required: false,
      default: undefined,
    },
    /**
     * Determines which value of the option Object is searched.
     * It is a function which returns the value of an option that is tracked by the search input.
     * The passed parameters are an option and an array of all selected options.
     * By default, it returns the label of the passed option.
     */
    optionSearchValue: {
      type: Function as PropType<((option: Option | unknown) => string)>,
      required: false,
      default: (option: Option | unknown) => {
        if (option)
          return (option as Option).label
        else
          return null
      },
    },
    /**
     * Text that is displayed if there are no search results.
     */
    noResultsText: {
      type: String,
      required: false,
      default: 'No results found.',
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
     *   clearIcon,
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
      default: () => ({}),
    },
    /**
     * When set to true, `loadMore` will be emitted if you scroll to the bottom of the option dropdown.
     */
    infinite: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Is the maximum amount of options for infinite scrolling. If it is reached `loadMore` won't be emitted when scrolling
     * to the bottom of the dropdown while `infinite` is true.
     */
    maxOptions: {
      type: Number,
      required: false,
      default: 1000,
    },
    /**
     * Whether the options are loading. Displays a loading spinner in the dropdown if set to true.
     */
    loadingOptions: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: {
    'open': () => true,
    'close': () => true,
    'select': (option: Option | unknown) => !!option,
    'deselect': (option: Option | unknown) => !!option,
    'search-change': (searchString: string) => searchString.length >= 0,
    'update:modelValue': () => true,
    'clear': () => true,
    'loadMore': () => true,
  },
  setup(props, context: SetupContext) {
    const {
      multiple, modelValue, searchable, disabled, closeOnSelect, selectOptions, displaySelectedValues,
      optionValue, optionLabel, optionDisabled, optionSearchValue, classes, infinite, maxOptions, loadingOptions,
    } = toRefs(props)
    const dropdown = useDropdown(context)
    const search = useSearch(context)
    const multiselect = useMultiselect(
      searchable,
      disabled,
      multiple,
      context,
      dropdown.openDropdown,
      dropdown.closeDropdown,
      search.clearSearch,
      dropdown.dropdownOpen,
      search.input,
    )
    const options = useOptions(
      multiple,
      modelValue,
      closeOnSelect,
      selectOptions,
      displaySelectedValues,
      optionValue,
      optionLabel,
      optionDisabled,
      optionSearchValue,
      infinite,
      context,
      multiselect.deactivate,
      search.search,
    )
    const scroll = useScroll(
      infinite,
      maxOptions,
      loadingOptions,
      selectOptions,
      context,
    )
    const classList = useClasses(
      disabled,
      optionDisabled,
      classes,
      options.selectedOptions,
      dropdown.dropdownOpen,
      options.isSelected,
      multiselect.isActive,
    )

    return {
      ...dropdown,
      ...search,
      ...options,
      ...multiselect,
      ...classList,
      ...scroll,
    }
  },
})

</script>

<style>

</style>
