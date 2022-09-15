<template>
  <div class="mt-3 mx-5 flex flex-col">
    <Multiselect
      v-if="!dynamicOptions"
      ref="multiselect"
      v-model="selected"
      :clearable="clearable"
      :classes="classes"
      :close-on-select="closeOnSelect"
      :disabled="disabled"
      :option-label="optionLabel"
      :option-value="optionValue"
      :option-disabled="optionDisabled"
      :option-search-value="optionSearchValue"
      :multiple="multiple"
      :display-selected-values="displaySelectedValues"
      :placeholder="placeholder"
      :searchable="searchable"
      :select-options="selectOptions"
      :no-options-text="noOptionsText"
      :no-results-text="noResultsText"
    />
    <Multiselect
      v-else
      ref="multiselect"
      v-model="selected"
      :clearable="clearable"
      :classes="classes"
      :close-on-select="closeOnSelect"
      :disabled="disabled"
      :option-label="optionLabel"
      :option-value="optionValue"
      :option-disabled="optionDisabled"
      :option-search-value="optionSearchValue"
      :multiple="multiple"
      :display-selected-values="displaySelectedValues"
      :placeholder="placeholder"
      :searchable="searchable"
      :select-options="dynamicSelectOptions"
      :no-options-text="noOptionsText"
      :no-results-text="noResultsText"
    />
    <div v-if="vModel">
      <button
        class="mt-4 text-center w-full border-2 bg-gray-100"
        data-cy="pushButton"
        @click="pushValue"
      >
        Push a random
        value from Options
      </button>
      <button
        class="mt-4 text-center w-full border-2 bg-gray-100"
        data-cy="illegalPushButton"
        @click="pushIllegalValue"
      >
        Push an illegal Value
      </button>
    </div>
    <div
      v-if="vModel"
      class="mt-4"
    >
      <span>selected values:<br></span>
      <ul v-if="multiple">
        <li
          v-for="(select, id) in selected"
          :key="id"
          data-cy="selected"
        >
          {{ select }}
        </li>
      </ul>
      <span
        v-else
        data-cy="selected"
      >{{ selected }}</span>
    </div>
    <div v-if="dynamicOptions">
      <button
        class="mt-4 text-center w-full border-2 bg-gray-100"
        data-cy="changeOptionsButton"
        @click="changeSelectOptions"
      >
        Change select Options
      </button>
    </div>
    <div v-if="testExposedFunctions">
      <button
        class="mt-4 text-center w-full border-2 bg-gray-100"
        data-cy="focusButton"
        @click="testFocus"
      >
        Fokus
      </button>
      <button
        class="mt-4 text-center w-full border-2 bg-gray-100"
        data-cy="blurButton"
        @click="testBlur"
      >
        Blur
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import type {InputHTMLAttributes, PropType, SelectHTMLAttributes} from 'vue'
import {defineComponent, ref, toRefs} from 'vue'
import Multiselect from '../Multiselect.vue'
import type {Classes, Option} from '../types'
import '../index.css'

export default defineComponent({
  name: 'MultiselectTester',
  components: {Multiselect},
  props: {
    vModel: {
      type: Boolean,
      required: false,
      default: false,
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    optionLabel: {
      type: Function as PropType<((option: Option | unknown, selectedOptions: Array<Option | unknown>) => string)>,
      required: false,
      default: (option: Option | unknown) => {
        if (option)
          return (option as Option).label
        else
          return null
      },
    },
    optionValue: {
      type: Function as PropType<((option: Option | unknown, selectedOptions: Array<Option | unknown>) => unknown)>,
      required: false,
      default: (option: Option | unknown) => {
        if (option)
          return (option as Option).value
        else
          return null
      },
    },
    optionDisabled: {
      type: Function as PropType<((option: Option | unknown, selectedOptions: Array<Option | unknown>) => boolean)>,
      required: false,
      default: (option: Option | unknown) => {
        return (option as Option).disabled
      },
    },
    optionSearchValue: {
      type: Function as PropType<((option: Option | unknown, selectedOptions: Array<Option | unknown>) => string)>,
      required: false,
      default: (option: Option | unknown) => {
        if (option)
          return (option as Option).label
        else
          return null
      },
    },
    displaySelectedValues: {
      type: [Function, String] as PropType<((options: Array<Option | unknown>) => string) | string>,
      required: false,
      default: undefined,
    },
    selectOptions: {
      type: Array as PropType<Array<Option | unknown>>,
      required: false,
      default: () => ([]),
    },
    selectProps: {
      type: Object as PropType<SelectHTMLAttributes>,
      default: undefined,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    clearable: {
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
    searchProps: {
      type: Object as PropType<InputHTMLAttributes>,
      required: false,
      default: () => ({}),
    },
    closeOnSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
    classes: {
      type: Object as PropType<Classes>,
      required: false,
      default: () => ({}),
    },
    dynamicOptions: {
      type: Boolean,
      required: false,
      default: false,
    },
    noOptionsText: {
      type: String,
      required: false,
      default: '',
    },
    noResultsText: {
      type: String,
      required: false,
      default: '',
    },
    testExposedFunctions: {
      type: Boolean,
      required: false,
      default: false,
    },
    setValue: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  setup(props) {
    const {vModel, multiple, selectOptions, setValue} = toRefs(props)
    const selected = ref<Array<Option | unknown> | Option | unknown>()

    if (vModel.value) {
      if (multiple.value)
        selected.value = []
    }

    function pushValue() {
      if (vModel.value) {
        let value = (selectOptions.value[1] as Option).value
        if (setValue.value && multiple.value) {
          value = [value]
          selected.value = value
        }
        else if (setValue.value && !multiple.value) {
          selected.value = value
        }
        else if (!setValue.value && Array.isArray(selected.value)) {
          selected.value.push(value)
        }
      }
    }

    function pushIllegalValue() {
      if (vModel.value) {
        const value = {this: 'Hallo', is: 1234, a: {Test: 'okayyy, let\'s go'}}
        if (setValue.value && multiple.value) {
          const secondValue = (selectOptions.value[1] as Option).value
          selected.value = [value, secondValue]
        }

        else if (setValue.value && !multiple.value) {
          selected.value = value
        }

        else if (!setValue.value && Array.isArray(selected.value)) {
          selected.value.push(value)
        }
      }
    }

    const dynamicSelectOptions = ref<Option[]>([
      {value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'},
      {value: 2, label: 'is'},
      {value: 'haha', label: 'a'},
      {value: 4, label: 'test'}])

    function changeSelectOptions() {
      dynamicSelectOptions.value = [
        {value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'},
        {value: 2, label: 'is'},
        {value: 'haha', label: 'a'},
      ]
    }

    const multiselect = ref<typeof Multiselect | null>(null)

    function testFocus() {
      multiselect.value?.focus()
    }

    function testBlur() {
      setTimeout(() => {
        multiselect.value?.blur()
      }, 1000)
    }

    return {
      selected,
      pushValue,
      pushIllegalValue,
      dynamicSelectOptions,
      changeSelectOptions,
      testFocus,
      testBlur,
      multiselect,
    }
  },
})
</script>

<style>

</style>
