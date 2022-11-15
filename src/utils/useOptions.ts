import * as _ from 'lodash'
import type {Ref, SetupContext} from 'vue'
import {computed, ref, watch} from 'vue'
import type {Option} from '../types'

export default function useOptions(multiple: Ref<boolean>,
  modelValue: Ref,
  closeOnSelect: Ref<boolean>,
  selectOptions: Ref<Array<Option | unknown>>,
  displaySelectedValues: Ref<((options: Array<Option | unknown>) => string) | string | undefined>,
  optionValue: Ref<(option: Option | unknown, selectedOptions: Array<Option | unknown>) => unknown>,
  optionLabel: Ref<(option: Option | unknown, selectedOptions: Array<Option | unknown>) => string>,
  optionDisabled: Ref<(option: Option | unknown, selectedOptions: Array<Option | unknown>) => boolean>,
  optionSearchValue: Ref<(option: Option | unknown, selectedOptions: Array<Option | unknown>) => string>,
  infinite: Ref<boolean>,
  context: SetupContext,
  deactivate: () => void,
  search: Ref<string>) {
  const selectedOptionsRef = ref<Array<Option | unknown>>([])

  const optionMap = computed<Map<string, Option | unknown>>(() => {
    const map = new Map<string, Option | unknown>()
    selectedOptionsRef.value = _.uniq(selectedOptionsRef.value)
    selectOptions.value.forEach((option: Option | unknown) => {
      const valueString = JSON.stringify(optionValue.value(option, selectedOptionsRef.value))
      map.set(valueString, option)
    })
    return map
  })

  function isSelected(option: Option | unknown) {
    return selectedOptionsRef.value.some((selectedOption) => {
      return _.isEqual(optionValue.value(selectedOption, selectedOptionsRef.value), optionValue.value(option, selectedOptionsRef.value))
    })
  }

  function updateModelValue(options: Array<Option | unknown>) {
    let value
    if (multiple.value) {
      value = []
      options.forEach((option) => {
        value.push(optionValue.value(option, options))
      })
    }
    else {
      value = null
      if (options.length > 0)
        value = optionValue.value(options[0], options)
    }
    context.emit('update:modelValue', value)
  }

  const selectedOptions = computed<Array<Option | unknown>>({
    get() {
      selectedOptionsRef.value = _.uniq(selectedOptionsRef.value)
      return selectedOptionsRef.value
    },
    set(values) {
      // :thisisfine
      let correctValues: Array<unknown> | unknown
      const correctOptions: Array<Option | unknown> = []
      if (multiple.value && _.isArray(values)) {
        correctValues = []
        values.forEach((value) => {
          const option = optionMap.value.get(JSON.stringify(value))
          if (option) {
            (correctValues as Array<unknown>).push(value)
            correctOptions.push(option)
            if (!isSelected(option)) {
              selectedOptionsRef.value.push(option)
              context.emit('select', option)
            }
            else if (infinite.value) {
              selectedOptionsRef.value.push(option)
            }
          }
          else if (infinite.value) {
            (correctValues as Array<unknown>).push(value)
            correctOptions.push({value})
            if (!isSelected({value}))
              selectedOptionsRef.value.push({value})
          }
        })
        correctValues = _.uniq(correctValues as Array<unknown>)
      }
      else {
        correctValues = null
        const value = values[0]
        const option = optionMap.value.get(JSON.stringify(value))
        if (option) {
          correctValues = value
          correctOptions.push(option)
          if (!isSelected(option)) {
            selectedOptionsRef.value = [option]
            context.emit('select', option)
          }
          else if (infinite.value) {
            selectedOptionsRef.value = [option]
          }
        }
        else if (infinite.value) {
          correctValues = value
          correctOptions.push({value})
          if (!isSelected({value}))
            selectedOptionsRef.value = [{value}]
        }
      }
      selectedOptionsRef.value = _.uniq(selectedOptionsRef.value)

      if (!_.isEqual(selectedOptionsRef.value, correctOptions))
      // TODO maybe emit deselected values too ?
        selectedOptionsRef.value = correctOptions
      if (!_.isEqual(values, correctValues))
        context.emit('update:modelValue', correctValues)
    },
  })

  const shownOptions = computed<Array<Option | unknown>>(() => {
    if (!infinite.value && search && search.value) {
      return (selectOptions.value as Option[]).filter((option: Option | unknown) => {
        return optionSearchValue.value(option, selectedOptions.value).toLowerCase().includes(search.value.toLowerCase())
      })
    }
    return selectOptions.value
  })

  const noOptions = computed(() => selectOptions.value.length === 0)

  const noResults = computed(() => search && search.value && shownOptions.value && shownOptions.value.length === 0)

  watch(() => modelValue.value, (value) => {
    selectedOptions.value = _.isArray(value) ? value : [value]
  }, {deep: true})

  watch(optionMap, (newMap, oldMap) => {
    if (!_.isEqual(newMap, oldMap))
      selectedOptions.value = _.isArray(modelValue.value) ? modelValue.value : [modelValue.value]
  })

  function select(option: Option | unknown) {
    if (!isSelected(option)) {
      multiple.value ? selectedOptionsRef.value.push(option) : selectedOptionsRef.value = [option]
      context.emit('select', option)
      updateModelValue(selectedOptions.value)
      if (closeOnSelect.value)
        deactivate()
    }
  }

  function deselect(option: Option | unknown) {
    if (isSelected(option)) {
      if (multiple.value) {
        selectedOptionsRef.value = selectedOptionsRef.value.filter((selectedOption) => {
          return !_.isEqual(selectedOption, option)
        })
      }
      else {
        selectedOptionsRef.value.length = 0
      }
      context.emit('deselect', option)
      updateModelValue(selectedOptions.value)
    }
  }

  function handleOptionClick(option: Option | unknown) {
    if (optionDisabled.value(option, selectedOptions.value))
      return

    if (isSelected(option))
      deselect(option)
    else
      select(option)
  }

  const noSelection = computed(() => {
    return selectedOptions.value.length === 0
  })

  function clear() {
    selectedOptionsRef.value.length = 0
    deactivate()
    context.emit('clear')
    updateModelValue(selectedOptions.value)
  }

  const valueDisplayText = computed(() => {
    if (multiple.value) {
      if (displaySelectedValues && displaySelectedValues.value) {
        if (typeof displaySelectedValues.value === 'string' || displaySelectedValues.value instanceof String)
          return displaySelectedValues.value
        else
          return displaySelectedValues.value(selectedOptions.value)
      }
      else {
        // default multiple label
        return selectedOptions.value && selectedOptions.value.length > 1 ? `${selectedOptions.value.length} Optionen gewählt` : '1 Option gewählt'
      }
    }
    else {
      return optionLabel.value(selectedOptions.value[0], selectedOptions.value)
    }
  })

  return {
    noOptions,
    shownOptions,
    noResults,
    selectedOptionsRef,
    selectedOptions,
    isSelected,
    handleOptionClick,
    deselect,
    valueDisplayText,
    noSelection,
    clear,
  }
}
