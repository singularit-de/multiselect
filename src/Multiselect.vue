<template>
  <div
      id="multiselect"
      ref="multiselect"
      :class="{'is-active': isActive, 'dropdown-open': dropdownOpen}"
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
    <slot v-if="!noSelection && canClear" :clear="clear" name="clear">
    <span class="multiselect-clear" @click="clear"><span
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

export default defineComponent({
  name: 'Multiselect',
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
    }
  },
  computed: {},
  setup(props, context) {

    const value = useValue(props, context)
    const dropdown = useDropdown(props, context)
    const search = useSearch(props, context)
    const options = useOptions(props, context, {
      selectedValues: value.selectedValues,
      search: search.search
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
.multiselect {
  @apply relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-300 rounded bg-white text-base leading-snug outline-none;
}

.multiselect.is-active {
  @apply ring ring-green-500 ring-opacity-30;
}

.multiselect.dropdown-open {
  @apply rounded-b-none
}

.multiselect-search {
  @apply w-full absolute inset-0 outline-none appearance-none box-border border-0 text-base font-sans bg-white rounded pl-3.5;
}


.multiselect-dropdown {
  @apply max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full border border-gray-300 -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b;
}

.multiselect-dropdown.is-hidden {
  @apply hidden
}

.multiselect-options {
  @apply flex flex-col p-0 m-0 list-none;
}

.multiselect-option {
  @apply flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3 hover:text-gray-800 hover:bg-gray-100;
}

.multiselect-option.is-selected {
  @apply text-white bg-green-500 hover:bg-green-600;
}

.multiselect-option.is-hidden{
  @apply hidden;
}

.multiselect-clear {
  @apply pr-3.5 relative z-10 opacity-40 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80;
}

.multiselect-clear-x {
  @apply text-lg font-bold text-center
}

.multiselect-label {
  @apply flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5;
}

.multiselect-placeholder {
  @apply flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 text-gray-400;
}

.multiselect-spacer {
  @apply h-9 py-px box-content;
}

</style>
