<template>
  <div class="mt-3 mx-5 flex flex-col">
    <Multiselect
        v-model="selected"
        :canClear="canClear"
        :close-on-select="closeOnSelect"
        :disabled="disabled"
        :input-type="inputType"
        :multiple="multiple"
        :multiple-label="multipleLabel"
        :placeholder="placeholder"
        :searchable="searchable"
        :select-options="selectOptions"
        :classes="classes"
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
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRefs} from "vue";
import Multiselect from "../Multiselect.vue";
import Option from "../types/option.type";
import Classes from "../types/classes.type";
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
    multipleLabel: {
      type: [Function, String],
      required: false,
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
    closeOnSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
    classes: {
      type: Object as PropType<Classes>,
      required: false,
      default: ()=>({})
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
        const value = (selectOptions.value[Math.floor(Math.random() * selectOptions.value.length)] as Option).value
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

    return {
      selected,
      pushValue,
      pushIllegalValue
    }
  }
})
</script>

<style src="../style/default.css"></style>
<style>

</style>