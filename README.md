# sIT Multiselect Komponente

- [Installation](#installation)
- [Props](#props)
- [Events](#events)
- [Slots](#slots)
- [Styling](#styling)
  - [Default Tailwind Classes](#default-tailwind-classes)
  - [Customization](#customization)
- [Examples](#examples)
  - [Single Select](#single-select)
  - [Multiselect](#multiselect)

## Installation

```bash
npm install @singularit/multiselect@beta
```


## Props

| Name                      | Type                                                                | Default                        | Description                                                                                                                                                                                                                                                                                                    |
|---------------------------|---------------------------------------------------------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **modelValue**            | <code>string&#124;number&#124;object&#124;array&#124;boolean</code> | <code>null&#124;[]</code>      | The value that is used externally. The default values make sure the component works if the the selected values aren't used externally.                                                                                                                                                                         |
| **multiple**              | `boolean`                                                           | `false`                        | Whether multiple options can be selected.                                                                                                                                                                                                                                                                      |
| **selectOptions**         | `array`                                                             | `[]`                           | Array of options that can be selected. An option should look like this: `{value: ..., label: '...', ...}`.                                                                                                                                                                                                     |
| **placeholder**           | `string`                                                            | `''`                           | The placeholder string will be displayed if no option is selected.                                                                                                                                                                                                                                             |
| **optionLabel**           | `function`                                                          |                                | Function that determines which attribute of the option object should be displayed as label. The passed parameters are an option and an array of all selected options. By default, it returns the label attribute of the passed option.                                                                         |
| **optionValue**           | `function`                                                          |                                | Function that determines which attribute of the option object should be used as value. The passed parameters are an option and an array of all selected options. By default, it returns the value attribute of the passed option.                                                                              |
| **optionDisabled**        | `function`                                                          |                                | Function which determines if an option is disabled. The passed parameters are an option and an array of all selected options. By default, it returns the disabled attribute of the passed option.                                                                                                              |
| **displaySelectedValues** | <code>function&#124;string</code>                                   |                                | Determines what is displayed in the value display. Can be a string or a function returning a string. The passed parameter of the function is an array of all selected options. By default the amount of selected options will be displayed in multiselect and the `optionValue` of an option in single select. |
| **clearable**             | `boolean`                                                           | `true`                         | Whether all selected options can be cleared.                                                                                                                                                                                                                                                                   |
| **disabled**              | `boolean`                                                           | `false`                        | Disables the component. Values can still be pushed into the model value externally.                                                                                                                                                                                                                            |
| **searchable**            | `boolean`                                                           | `false`                        | Whether options can be searched.                                                                                                                                                                                                                                                                               |
| **searchProps**           | `object`                                                            |                                | Allows passing HTML input attributes to the search input element.                                                                                                                                                                                                                                              |
| **optionSearchValue**     | `function`                                                          |                                | Determines which value of the option Object is searched.It is a function which returns the value of an option that is tracked by the search input.The passed parameters are an option and an array of all selected options.By default, it returns the label of the passed option.                              |
| **selectProps**           | `object`                                                            |                                | Allows passing HTML select attributes to the hidden select element.                                                                                                                                                                                                                                            |
| **closeOnSelect**         | `boolean`                                                           | `false`                        | Whether the selection dropdown should automatically be closed after selecting/deselection an option.                                                                                                                                                                                                           |
| **noOptionsText**         | `string`                                                            | `'Die Liste ist leer'`         | Text that is displayed if no options are given.                                                                                                                                                                                                                                                                |
| **noResultsText**         | `string`                                                            | `'Keine Ergebnisse gefunden'`  | Text that is displayed if there are no search results.                                                                                                                                                                                                                                                         |
| **classes**               | `object`                                                            | `{}`                           | An object of class names that gets merged with the default values.                                                                                                                                                                                                                                             |
| **infinite**              | `boolean`                                                           | `false`                        | When set to true, `loadMore` will be emitted if you scroll to the bottom of the option dropdown.                                                                                                                                                                                                               |
| **maxOptions**            | `number`                                                            | `1000`                         | Is the maximum amount of options for infinite scrolling. If it is reached `loadMore` won't be emitted when scrolling to the bottom of the dropdown while `infinite` is true.                                                                                                                                   |
| **loadingOptions**        | `boolean`                                                           | `false`                        | Whether the options are loading. Displays a loading spinner in the dropdown if set to true.                                                                                                                                                                                                                    | 

## Events

| Event          | Attributes | Description                                                                            |
|----------------|------------|----------------------------------------------------------------------------------------|
| @open          |            | Emitted after opening the selection dropdown.                                          |
| @close         |            | Emitted after closing the selection dropdown.                                          |
| @select        | `option`   | Emitted after an option is selected.                                                   |
| @deselect      | `option`   | Emitted after an option is deselected.                                                 |
| @search-change | `query`    | Emitted after a character is typed in the search input.                                |
| @clear         |            | Emitted after selected options are cleared.                                            |
| @loadMore      |            | Emitted after scrolling to the bottom of the option dropdown while `infinite` is true. |

## Slots

| Slot            | Attributes          | Description                                                                                                                            |
|-----------------|---------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| placeholder     |                     | Rendered as placeholder when no option is selected and `placeholder` prop is defined.                                                  |
| value-display   | `selectedOptions`   | Rendered if an option is selected and the search input is empty.                                                                       |
| optionLabel     | `option,isSelected` | Renders an option in the selection dropdown. `isSelected` is provided to determine the state.                                          |
| clear           | `clear`             | Renders a remove icon if any option is selected and `clearable` prop is true. The `clear` method should be used on `@mousedown` event. |
| no-options      |                     | Rendered if the options list is empty. By default renders `noOptionsText`.                                                             |
| no-results      |                     | Rendered if there are no search results. By default renders `noResultsText`.                                                           |
| loading-options |                     | Rendered in option dropdown if `loadingOptions` is true.                                                                               |

## Styling

### Default Tailwind Classes

These are the default Tailwind classes used for styling the component.

```
{
    container: 'h-auto relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-300 bg-white rounded text-base leading-snug outline-none',
    containerDisabled: 'cursor-default',
    containerOpen: 'rounded-b-none',
    containerActive: 'ring ring-opacity-70 ring-orange-400',
    label: 'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5',
    search: 'w-full absolute inset-0 outline-none appearance-none box-border border-0 text-base font-sans bg-white rounded pl-3.5',
    placeholder: 'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 text-gray-400',
    clear: 'pr-3.5 relative z-10 opacity-40 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80',
    clearIcon: 'text-lg font-bold text-center pl-3',
    dropdown: 'max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full border border-gray-300 -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b',
    dropdownHidden: 'hidden',
    options: 'flex flex-col p-0 m-0 list-none',
    option: 'flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3 hover:text-gray-800 hover:bg-gray-100',
    optionSelected: 'text-white bg-orange-400 hover:bg-orange-500',
    optionDisabled: 'flex items-center justify-start box-border text-left text-base leading-snug py-2 px-3 bg-gray-200 cursor-disabled',
    noOptions: 'py-2 px-3 text-gray-600 bg-white text-left rtl:text-right',
    noResults: 'py-2 px-3 text-gray-600 bg-white text-left rtl:text-right',
    spacer: 'h-9 py-px box-content',
}
```

### Customization

If you want to completely re-style some elements from ground up:

```vue
<Multiselect
    ...
    :classes="{
        container: 'some new tailwind classes',
        ...
    }"
/> 
```


If you just want to keep the recommended base style an only change a few things like colors or sizes, import baseStyle and use it like this:

```vue
<Multiselect ... 
    :classes="{
        container: [baseStyle.container, 'bg-gray-200'],
        spacer: [baseStyle.spacer, 'h-20'],
        dropdown: [baseStyle.dropdown, 'max-h-90'],
        optionSelected: [baseStyle.optionSelected, 'bg-gray-400 hover:bg-gray-500'],
        ... 
        }"
/>
```

## Examples

### Single select

```vue
<Multiselect
  v-model="value"
  :select-options="[
      {value: 'Just', label: 'How'},
      {value: 'an', label: 'are'},
      {value: 'example', label: 'you?'}
  ]"
/>
```

### Multiselect

```vue
<Multiselect
  v-model="value"
  multiple
  :select-options="[
      {value: 'Just', label: 'How'},
      {value: 'an', label: 'are'},
      {value: 'example', label: 'you?'}
  ]"
/>
```
