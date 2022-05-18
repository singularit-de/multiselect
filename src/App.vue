<template>
  <div class="w-60 mx-20 my-10">
    <Multiselect
        class=""
        searchable
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
import Option from "./types/option.type";

const selected = ref<any[]>([])

const value = {cool: 'yes', swag: 'no', number: 1, nested: {ahoy: 'yeah'}}

const options = [
  {value: {cool: 'yes', swag: 'no', number: 1, nested: {ahoy: 'yeah'}}, label: 'huhu'},
  {value: {cool: 'no', swag: 'no', number: 2, nested: {ahoy: 'flippi'}}, label: 'okok', },
  {value: {cool: 'yes', swag: 'yes', number: 3, nested: {ahoy: 'heckin chomker'}}, label: 'whhaaaat'},
  // {value: 1, label: 'nice'},
  // {value: 2, label: 'aha'},
  // {value: 3, label: 'sheesh'}
]

function push(value: Object) {
  if (selected.value.indexOf(value) === -1) {
    selected.value.push(value)
  }
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
</script>

<style scoped>

</style>