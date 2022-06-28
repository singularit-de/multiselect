<template>
  <div
      id="multiselect"
      ref="multiselect"
      :class="classList.container"
      :tabindex="tabindex"
      data-cy="multiselect"
      @focusin="activate"
      @focusout="deactivate"
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

    <!-- Label -->
    <template v-if="!noSelection && !search">
      <slot :value="selectedValues" name="label">
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
            v-for="(option) in selectOptions"
            :key=option.value
            :class="classList.option(option)"
            data-cy="option"
            @click="handleOptionClick(option)"
        >
          <slot :option="option" :isSelected="isSelected" name="optionLabel">
            <span data-cy="optionLabel"
            >{{ option.label }}</span>
          </slot>
        </li>
      </ul>
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
import Classes from "./types/classes.type";
import Option from "./types/option.type";
import _ from "lodash";


export default defineComponent({
  name: 'Multiselect',
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
     * The placeholder string will be displayed if no option is selected.
     */
    placeholder: {
      type: String,
      required: false,
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
      type: [Function, String] as PropType<((options: Array<Option>)=>string) | string>,
      required: false,
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
     * The selection dropdown will be automatically closed after selecting/deselecting an option if this prop is set to true.
     */
    closeOnSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Used to style the component via tailwind classes. To alter the style of single elements,
     * import defaultTailwind from 'src/utils/defaultTailwind' and use it like this:
     * <pre><code>
     * :classes={
     *   container: [defaultTailwind.container, 'newContainerStyles'],
     *   option: [defaultTailwind.option, 'newOptionStyles'],
     *   ...
     * }
     * </code></pre>
     * This will only replace the CSS defined in the new classes. Tailwind classes won't overwrite the default style.
     * To completely restyle the elements you can just ignore the defaultTailwind, this allows using tailwind classes directly.
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
