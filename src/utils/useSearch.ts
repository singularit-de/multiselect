import type {SetupContext} from 'vue'
import {ref, watch} from 'vue'

export default function useSearch(context: SetupContext) {
  const input = ref<HTMLInputElement | null>(null)
  const search = ref('')

  function clearSearch() {
    search.value = ''
  }

  function handleInput(e: InputEvent) {
    search.value = (e.target as HTMLInputElement).value
  }

  watch(search, (val) => {
    context.emit('search-change', val)
  })

  return {
    search,
    clearSearch,
    handleInput,
    input,
  }
}
