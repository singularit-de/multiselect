import type {SetupContext} from 'vue'
import {computed, ref} from 'vue'

export default function useSearch(context: SetupContext) {
  const input = ref<HTMLInputElement>()
  const searchString = ref('')
  const search = computed<string>({
    get() {
      return searchString.value
    },
    set(val) {
      searchString.value = val
      context.emit('search-change', val)
    },
  })

  function clearSearch() {
    if (search.value)
      search.value = ''
  }

  return {
    search,
    clearSearch,
    input,
  }
}
