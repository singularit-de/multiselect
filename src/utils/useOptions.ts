import * as _ from 'lodash'
import type {Ref, SetupContext} from 'vue'
import {computed, ref, watch} from 'vue'
import type {Option} from '../types'

export default function useOptions(multiple: Ref<boolean>,
  modelValue: Ref,
  closeOnSelect: Ref<boolean>,
  selectOptions: Ref<Array<Option | unknown>>,
  displaySelectedValues: Ref<((options: Array<Option | unknown>) => string) | string | undefined>,
  optionValue: Ref<(option: Option | unknown) => unknown>,
  optionLabel: Ref<(option: Option | unknown) => string>,
  optionDisabled: Ref<(option: Option | unknown, selectedOptions: Array<Option | unknown>) => boolean>,
  optionSearchValue: Ref<(option: Option | unknown) => string>,
  infinite: Ref<boolean>,
  context: SetupContext,
  deactivate: () => void,
  search: Ref<string>) {
  const selectedOptionsRef = ref<Array<Option | unknown>>([])

  const optionMap = computed<Map<string, Option | unknown>>(() => {
    const map = new Map<string, Option | unknown>()
    selectOptions.value.forEach((option: Option | unknown) => {
      const valueString = JSON.stringify(optionValue.value(option))
      map.set(valueString, option)
    })
    return map
  })

  function isSelected(option: Option | unknown) {
    return selectedOptionsRef.value.some((selectedOption) => {
      return _.isEqual(optionValue.value(selectedOption), optionValue.value(option))
    })
  }

  const tempValue = ref<Array<unknown> | unknown>()

  function updateModelValue(options: Array<Option | unknown>) {
    let value
    if (multiple.value) {
      value = [] as Array<unknown>
      options.forEach((option) => {
        value.push(optionValue.value(option))
      })
      tempValue.value = [...value]
    }
    else {
      value = null
      if (options.length > 0)
        value = optionValue.value(options[0])
      tempValue.value = value
    }
    context.emit('update:modelValue', value)
  }

  const selectedOptions = computed<Array<Option | unknown>>({
    get() {
      if (selectedOptionsRef.value.length !== _.uniq(selectedOptionsRef.value).length)
        selectedOptionsRef.value = _.uniq(selectedOptionsRef.value)
      return selectedOptionsRef.value
    },
    set(values) {
      let correctValues: Array<unknown> = []
      const correctOptions: Array<Option | unknown> = []
      values.forEach((value) => {
        const option = optionMap.value.get(JSON.stringify(value))
        if (option) {
          correctValues.push(value)
          correctOptions.push(option)
          if (!isSelected(option)) {
            selectedOptionsRef.value.push(option)
            context.emit('select', option)
          }
          // overwrite option without label
          else if (infinite.value) {
            selectedOptionsRef.value.push(option)
          }
        }
        else if (infinite.value) {
          correctValues.push(value)
          if (!isSelected({value})) {
            correctOptions.push({value})
            selectedOptionsRef.value.push({value})
            context.emit('select', {value})
          }
          // keeps remembered Option
          else {
            const rememberedOption = selectedOptionsRef.value.find((selectedOption) => {
              return _.isEqual(value, optionValue.value(selectedOption))
            })
            correctOptions.push(rememberedOption)
          }
        }
      })
      correctValues = _.uniq(correctValues)
      selectedOptionsRef.value = _.uniq(selectedOptionsRef.value)

      if (!_.isEqual(selectedOptionsRef.value, correctOptions))
      // TODO maybe emit deselected values too ?
        selectedOptionsRef.value = correctOptions
      if (!_.isEqual(values, correctValues))
        context.emit('update:modelValue', multiple.value ? correctValues : correctValues[0])
    },
  })

  const shownOptions = computed<Array<Option | unknown>>(() => {
    if (!infinite.value && search && search.value) {
      return (selectOptions.value as Option[]).filter((option: Option | unknown) => {
        return optionSearchValue.value(option).toString().toLowerCase().includes(search.value.toLowerCase())
      })
    }
    return selectOptions.value
  })

  const noOptions = computed(() => !(infinite.value && search && search.value) && selectOptions.value.length === 0)

  const noResults = computed(() => search && search.value && shownOptions.value && shownOptions.value.length === 0)

  watch(() => modelValue.value, (value) => {
    if (!_.isEqual(value, tempValue.value)) {
      tempValue.value = multiple.value ? [...value] : value
      selectedOptions.value = _.isArray(value) ? value : value !== undefined ? [value] : []
    }
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
      return optionLabel.value(selectedOptions.value[0])
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
