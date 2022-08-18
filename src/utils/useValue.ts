import type {Ref} from 'vue'
import {computed, ref, watch} from 'vue'

export default function useValue(multiple: Ref<boolean>, modelValue: Ref) {
  const selectedValues = ref(modelValue.value)

  // for externally pushing things -> updates selectedValues
  watch(() => modelValue.value, (newValue) => {
    if (newValue !== selectedValues.value)
      selectedValues.value = modelValue.value
  })

  const noSelection = computed(() => {
    if (multiple.value)
      return !(selectedValues.value && selectedValues.value.length > 0)
    else
      return !(selectedValues.value || selectedValues.value === 0 || selectedValues.value === '')
  })

  return {
    selectedValues,
    noSelection,
  }
}
