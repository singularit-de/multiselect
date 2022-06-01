<!--Test-->
<template>
  <div class="w-60 mx-20 my-10">
    <Multiselect
        class="h-12"
        searchable
        multiple
        v-model="selected"
        :select-options="options"
        placeholder="test"
        :multiple-label="multipleLabel"
    />
    <button @click="push(value)" class="mt-4 text-center w-full border-2 bg-gray-100">Push a value</button>
    <ul>
      <li v-if="selected" v-for="(select, id) in selected" :key="id">{{select}}</li>
    </ul>
  </div>

</template>

<script setup lang="ts">
import Multiselect from "./Multiselect.vue";
import {ref} from "vue";
import Option from "./types/option";


//has to initialize as array if multiple mode is used
const selected = ref<any>([])
// const selected = ref<any>()

const value = {cool: 'yes', swag: 'no', number: 1, nested: {ahoy: 'yeah'}}

const options = [
  {value: {cool: 'yes', swag: 'no', number: 1, nested: {ahoy: 'yeah'}}, label: 'Click'},
  {value: {cool: 'no', swag: 'no', number: 2, nested: {ahoy: 'flippi'}}, label: 'Me', },
  {value: {cool: 'yes', swag: 'yes', number: 3, nested: {ahoy: 'heckin chomker'}}, label: 'Friend'},
]

function push(value: Object) {
   selected.value.push(value)
  // selected.value = value
}

function multipleLabel(selectedOptions: Option[]) {
  let label = ''
  if (selectedOptions && selectedOptions.length > 0) {
    for (const selectedOption of selectedOptions) {
      label += `${selectedOption.label}, `
    }
  }
  return label.slice(0, label.length-2)
}

// const multipleLabel = 'HALLO!!! <3'
</script>

<style scoped>

</style>