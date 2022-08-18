import * as _ from 'lodash'
import type {Ref, SetupContext} from 'vue'
import {computed, watch} from 'vue'
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
  context: SetupContext,
  selectedValues: Ref,
  deactivate: () => void,
  search: Ref<string>) {
  function isSelected(option: Option | unknown, selectedOptions: Array<Option | unknown>) {
    if (multiple.value) {
      let find = null
      if (selectedValues.value && selectedValues.value.length > 0) {
        if (selectedValues.value.includes(optionValue.value(option, selectedOptions)))
          return true

        // enable pushing values into modelValue correctly
        find = selectedValues.value.find((value: unknown, index: number) => {
          if (_.isEqual(value, optionValue.value(option, selectedOptions))) {
            // update value if option was pushed externally, because identical objects aren't equal
            if (selectedValues.value[index] !== optionValue.value(option, selectedOptions))
              selectedValues.value.splice(index, 1, optionValue.value(option, selectedOptions))
            return true
          }
          return false
        })
      }
      return !!find
    }
    else {
      if ((selectedValues.value || selectedValues.value === 0 || selectedValues.value === '')
          && _.isEqual(selectedValues.value, optionValue.value(option, selectedOptions))) {
        if (selectedValues.value !== optionValue.value(option, selectedOptions))
          selectedValues.value = optionValue.value(option, selectedOptions)

        return true
      }
      else {
        return false
      }
    }
  }

  const selectedOptions = computed<Array<Option | unknown>>(() => {
    const selected = []
    for (const option of selectOptions.value) {
      if (isSelected(option, selectedOptions.value))
        selected.push(option)
    }

    // prevents from pushing illegal stuff in single mode
    if (!multiple.value && selectedValues.value !== null && selected.length === 0) {
      selectedValues.value = null
      context.emit('update:modelValue', selectedValues.value)
    }
    return selected
  })

  const shownOptions = computed<Array<Option | unknown>>(() => {
    if (search && search.value) {
      return (selectOptions.value as Option[]).filter((option: Option | unknown) => {
        return optionSearchValue.value(option, selectedOptions.value).toLowerCase().includes(search.value.toLowerCase())
      })
    }
    return selectOptions.value
  })

  const noOptions = computed(() => selectOptions.value.length === 0)

  const noResults = computed(() => search && search.value && shownOptions.value && shownOptions.value.length === 0)

  watch(modelValue.value, () => {
    // prevents from pushing things that aren't options and pushing the same option multiple times in multiple mode
    if (multiple.value && (selectedOptions.value as Array<Option | unknown>).length < selectedValues.value.length)
      selectedValues.value.pop()
  })

  function select(option: Option | unknown) {
    multiple.value ? selectedValues.value.push(optionValue.value(option, selectedOptions.value)) : selectedValues.value = optionValue.value(option, selectedOptions.value)
    context.emit('select', option)
    context.emit('update:modelValue', selectedValues.value)
    if (closeOnSelect.value)
      deactivate()
  }

  function deselect(option: Option | unknown) {
    if (multiple.value) {
      const index = selectedValues.value.indexOf(optionValue.value(option, selectedOptions.value))
      selectedValues.value.splice(index, 1)
    }
    else {
      selectedValues.value = null
    }
    context.emit('deselect', option)
    context.emit('update:modelValue', selectedValues.value)
  }

  function handleOptionClick(option: Option | unknown) {
    if (optionDisabled.value(option, selectedOptions.value))
      return

    if (isSelected(option, selectedOptions.value))
      deselect(option)
    else
      select(option)
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
    selectedOptions,
    isSelected,
    handleOptionClick,
    deselect,
    valueDisplayText,
  }
}
