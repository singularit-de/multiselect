<template>
  <div class="mt-3 mx-5 flex flex-col">
    <Multiselect
        v-if="!dynamicOptions"
        v-model="selected"
        :canClear="canClear"
        :classes="classes"
        :close-on-select="closeOnSelect"
        :disabled="disabled"
        :input-type="inputType"
        :label="label"
        :multiple="multiple"
        :multiple-label="multipleLabel"
        :placeholder="placeholder"
        :searchable="searchable"
        :select-options="selectOptions"
        :track-by="trackBy"
        :no-options-text="noOptionsText"
        :no-results-text="noResultsText"
    />
    <Multiselect
        v-else
        v-model="selected"
        :canClear="canClear"
        :classes="classes"
        :close-on-select="closeOnSelect"
        :disabled="disabled"
        :input-type="inputType"
        :label="label"
        :multiple="multiple"
        :multiple-label="multipleLabel"
        :placeholder="placeholder"
        :searchable="searchable"
        :select-options="dynamicSelectOptions"
        :track-by="trackBy"
        :no-options-text="noOptionsText"
        :no-results-text="noResultsText"
    />
    <div v-if="vModel">
      <button class="mt-4 text-center w-full border-2 bg-gray-100" data-cy="pushButton" @click="pushValue">Push a random
        value from Options
      </button>
      <button class="mt-4 text-center w-full border-2 bg-gray-100" data-cy="illegalPushButton"
              @click="pushIllegalValue">Push an illegal Value
      </button>
    </div>
    <div v-if="vModel" class="mt-4">
      <span>selected values:<br></span>
      <ul v-if="multiple">
        <li v-for="(select, id) in selected" :key="id" data-cy="selected">{{ select }}</li>
      </ul>
      <span v-else data-cy="selected">{{ selected }}</span>
    </div>
    <div v-if="dynamicOptions">
      <button class="mt-4 text-center w-full border-2 bg-gray-100" data-cy="changeOptionsButton"
              @click="changeSelectOptions">
        Change select Options
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRefs} from "vue";
import Multiselect from "../Multiselect.vue";
import {Option, Classes} from "../types"
import "../index.css"

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
    label: {
      type: String,
      required: false,
      default: 'label',
    },
    multipleLabel: {
      type: [Function, String] as PropType<((options: Array<Option>) => string) | string>,
      required: false,
    },
    selectOptions: {
      type: Array as PropType<Option[]>,
      required: false,
      default: () => ([])
    },
    placeholder: {
      type: String,
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
    inputType: {
      type: String,
      required: false,
      default: 'text',
    },
    trackBy: {
      type: String,
      required: false,
      default: 'label'
    },
    closeOnSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
    classes: {
      type: Object as PropType<Classes>,
      required: false,
      default: () => ({})
    },
    dynamicOptions: {
      type: Boolean,
      required: false,
      default: false,
    },
    noOptionsText: {
      type: String,
      required: false,
    },
    noResultsText: {
      type: String,
      required: false,
    }
  },
  setup(props) {
    const {vModel, multiple, selectOptions} = toRefs(props)
    let selected: any

    if (vModel.value) {
      if (multiple.value) {
        selected = ref([])
      } else {
        selected = ref()
      }
    }

    function pushValue() {
      if (vModel.value) {
        const value = (selectOptions.value[1] as Option).value
        if (multiple.value) {
          selected.value.push(value)
        } else {
          selected.value = value
        }
      }
    }

    function pushIllegalValue() {
      if (vModel.value) {
        const value = {this: 'Hallo', is: 1234, a: {Test: 'okayyy, let\'s go'}}
        if (multiple.value) {
          selected.value.push(value)
        } else {
          selected.value = value
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
        {value: 'haha', label: 'a'}
      ]
    }

    return {
      selected,
      pushValue,
      pushIllegalValue,
      dynamicSelectOptions,
      changeSelectOptions
    }
  }
})
</script>

<style>

</style>