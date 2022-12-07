import type {Ref, SetupContext} from 'vue'
import {computed} from 'vue'
import type {Option} from '../types'
import _ from 'lodash'

export default function useScroll(
  infinite: Ref<boolean>,
  maxOptions: Ref<number>,
  loadingOptions: Ref<boolean>,
  selectOptions: Ref<Array<Option | unknown>>,
  context: SetupContext,
) {
  const hasMore = computed(() => {
    return selectOptions.value.length < maxOptions.value
  })

  const handleScroll = _.debounce((e: Event) => {
    const {scrollTop, offsetHeight, scrollHeight} = e.target as HTMLDivElement
    if (scrollTop + offsetHeight >= scrollHeight && hasMore.value && !loadingOptions.value)
      context.emit('loadMore')
  }, 50)


  return {
    hasMore,
    handleScroll,
  }
}
