import type {SetupContext} from 'vue'
import {ref} from 'vue'

export default function useDropdown(context: SetupContext) {
  const dropdownOpen = ref(false)

  function openDropdown() {
    if (dropdownOpen.value)
      return

    dropdownOpen.value = true
    context.emit('open')
  }

  function closeDropdown() {
    if (!dropdownOpen.value)
      return

    dropdownOpen.value = false
    context.emit('close')
  }

  return {
    dropdownOpen,
    openDropdown,
    closeDropdown,
  }
}
