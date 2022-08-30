import type {Ref, SetupContext} from 'vue'
import {computed, ref} from 'vue'

export default function useMultiselect(searchable: Ref<boolean>,
  disabled: Ref<boolean>,
  multiple: Ref<boolean>,
  context: SetupContext,
  selectedValues: Ref,
  openDropdown: () => void,
  closeDropdown: () => void,
  clearSearch: () => void,
  dropdownOpen: Ref<boolean>,
  input: Ref<HTMLInputElement | null>,
) {
  const multiselect = ref<HTMLDivElement | null>(null)
  const isActive = ref(false)

  const tabindex = computed(() => searchable.value || disabled.value ? -1 : 0)

  function activate() {
    if (!disabled.value && !isActive.value) {
      isActive.value = true
      openDropdown()
    }
  }

  function deactivate() {
    if (isActive.value) {
      isActive.value = false
      setTimeout(() => {
        if (!isActive.value) {
          closeDropdown()
          clearSearch()
        }
      }, 1)
    }
  }

  function clear() {
    if (multiple.value)
      selectedValues.value.length = 0
    else
      selectedValues.value = null

    deactivate()
    context.emit('update:modelValue', selectedValues.value)
    context.emit('clear')
  }

  function handleFocus() {
    input.value?.focus()
  }

  function handleMousedown() {
    if (!dropdownOpen.value) {
      activate()
    }
    else if (dropdownOpen.value) {
      setTimeout(() => {
        deactivate()
      }, 0)
    }
  }

  context.expose({
    focus: () => {
      multiselect.value?.focus()
    },
    blur: () => {
      if (searchable.value)
        input.value?.blur()

      multiselect.value?.blur()
    },
  })

  return {
    multiselect,
    isActive,
    tabindex,
    activate,
    deactivate,
    clear,
    handleMousedown,
    handleFocus,
  }
}
