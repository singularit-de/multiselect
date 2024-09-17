import type {Ref, SetupContext} from 'vue'
import {computed, ref} from 'vue'

export default function useMultiselect(
  multiselectContainer: Ref<HTMLDivElement | undefined>,
  searchable: Ref<boolean>,
  disabled: Ref<boolean>,
  context: SetupContext,
  openDropdown: () => void,
  closeDropdown: () => void,
  clearSearch: () => void,
  dropdownOpen: Ref<boolean>,
  input: Ref<HTMLInputElement | undefined>,
) {
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
          if (searchable.value)
            input.value?.blur()
        }
      }, 1)
    }
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
      multiselectContainer.value?.focus()
    },
    blur: () => {
      if (searchable.value)
        input.value?.blur()

      multiselectContainer.value?.blur()
    },
  })

  return {
    isActive,
    tabindex,
    activate,
    deactivate,
    handleMousedown,
    handleFocus,
  }
}
