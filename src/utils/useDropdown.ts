import type {CSSProperties, MaybeRefOrGetter, Ref, SetupContext} from 'vue'
import {computed, nextTick, onMounted, onUnmounted, ref, toValue} from 'vue'

export default function useDropdown(context: SetupContext, position: MaybeRefOrGetter<'bottom' | 'top' | 'auto'>, container: Ref<HTMLDivElement | undefined>) {
  const dropdown = ref<HTMLDivElement>()
  const dropdownStyle = ref<CSSProperties>({})
  const dropdownOpen = ref(false)

  const dropdownPlacement = computed(() => {
    if (toValue(position) !== 'auto') {
      return toValue(position as 'bottom' | 'top')
    }
    else if (dropdown.value !== undefined) {
      const {bottom} = dropdown.value.getBoundingClientRect()
      return window.innerHeight - bottom < dropdown.value?.scrollHeight ? 'top' : 'bottom'
    }
    return 'bottom'
  })
  function updateWidth() {
    if (container.value) {
      const {width: containerWidth} = container.value.getBoundingClientRect()
      dropdownStyle.value.width = `${containerWidth}px`
    }
  }

  function openDropdown() {
    if (dropdownOpen.value)
      return

    updateWidth()

    dropdownOpen.value = true
    context.emit('open')
  }

  function closeDropdown() {
    if (!dropdownOpen.value)
      return

    dropdownOpen.value = false
    context.emit('close')
  }

  onMounted(() => {
    nextTick(updateWidth)

    window.addEventListener('resize', updateWidth)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  return {
    dropdownOpen,
    openDropdown,
    closeDropdown,
    dropdownPlacement,
    dropdown,
    dropdownStyle,
  }
}
