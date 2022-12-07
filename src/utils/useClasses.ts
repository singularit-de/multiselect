import type {Ref} from 'vue'
import {computed} from 'vue'
import type {Classes, Option} from '../types'
import '../index.css'
import {defaultTheme} from './defaultTheme'

export default function useClasses(disabled: Ref<boolean>,
  optionDisabled: Ref<(option: Option | unknown, selectedOptions: Array<Option | unknown>) => boolean>,
  classes: Ref<Classes>,
  selectedOptions: Ref<Array<Option | unknown>>,
  dropdownOpen: Ref<boolean>,
  isSelected: (option: Option | unknown, selectedOptions: Array<Option | unknown>) => boolean,
  isActive: Ref<boolean>) {
  const styleClasses = {
    ...defaultTheme,
    ...classes.value,
  }

  const classList = computed(() => {
    let container = styleClasses.container
    if (disabled.value)
      container = styleClasses.containerDisabled
    else if (isActive.value)
      container = styleClasses.containerActive

    let dropdown = styleClasses.dropdownHidden
    if (dropdownOpen.value)
      dropdown = styleClasses.dropdown

    return {
      container,
      label: styleClasses.label,
      search: styleClasses.search,
      placeholder: styleClasses.placeholder,
      clear: styleClasses.clear,
      clearIcon: styleClasses.clearIcon,
      dropdown,
      options: styleClasses.options,
      noOptions: styleClasses.noOptions,
      noResults: styleClasses.noResults,
      option: (o: Option | unknown) => {
        let option = styleClasses.option
        if (isSelected(o, selectedOptions.value))
          option = styleClasses.optionSelected

        if (optionDisabled.value(o, selectedOptions.value))
          option = styleClasses.optionDisabled

        return option
      },
      spacer: styleClasses.spacer,
      spinner: styleClasses.spinner,
    }
  })
  return {
    defaultTheme,
    classList,
  }
}
