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
npm install @singularit/multiselect
```


## Props

| Name              | Type                              | Default                  | Description                                                                                                                                                                                                                                               |
|-------------------|-----------------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **multiple**      | `boolean`                         | `false`                  | Whether multiple options can be selected.                                                                                                                                                                                                                 |
| **selectOptions** | `array`                           | `[]`                     | Array of options that can be selected. An option should look like this: `{value: ..., label: '...'}`.                                                                                                                                                     |
| **placeholder**   | `string`                          | `''`              | The placeholder string will be displayed if no option is selected.                                                                                                                                                                                        |
| **label**         | `string`                          | `'label'`                | Determines which value of the selected option object should be displayed as label.                                                                                                                                                                        |
| **multipleLabel** | <code>function&#124;string</code> | `''`                | Alters the displayed label if multiple selection mode is active. Can be a string or a function returning a string. The passed parameter of the function is an array of the selected options. By default the amount of selected options will be displayed. |
| **canClear**      | `boolean`                         | `true`                   | Whether all selected options can be cleared.                                                                                                                                                                                                              |
| **disabled**      | `boolean`                         | `false`                  | Disables the component. Values can still be pushed into the model value externally.                                                                                                                                                                       |
| **searchable**    | `boolean`                         | `false`                  | Whether options can be searched.                                                                                                                                                                                                                          |
| **inputType**     | `string`                          | `text`                   | Input type of the search input.                                                                                                                                                                                                                           |
| **trackBy**       | `string`                          | `'label'`                | The value of the option object which is searched if searchable is true. Searches the options labels by default.                                                                                                                                           |
| **closeOnSelect** | `boolean`                         | `false`                  | Whether the selection dropdown should automatically be closed after selecting/deselection an option.                                                                                                                                                      |
| **noOptionsText** | `string`                          | `'Die Liste ist leer'`     | Text that is displayed if no options are given.                                                                                                                                                                                                           |
| **noResultsText** | `string`                          | `'Keine Ergebnisse gefunden'` | Text that is displayed if there are no search results.                                                                                                                                                                                                    |
| **classes**       | `object`                          | `{}`                     | An object of class names that gets merged with the default values.                                                                                                                                                                                        |

## Events

| Event          | Attributes | Description                                             |
|----------------|------------|---------------------------------------------------------|
| @open          |            | Emitted after opening the selection dropdown.           |
| @close         |            | Emitted after closing the selection dropdown.           |
| @select        | `option`   | Emitted after an option is selected.                    |
| @deselect      | `option`   | Emitted after an option is deselected.                  |
| @search-change | `query`    | Emitted after a character is typed in the search input. |
| @clear         |            | Emitted after selected options are cleared.             |

## Slots

| Slot        | Attributes          | Description                                                                                                                           |
|-------------|---------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| placeholder |                     | Rendered as placeholder when no option is selected and `placeholder` prop is defined.                                                 |
| label       | `value`             | Rendered if single selection mode is active and an option is selected.                                                                |
| optionLabel | `option,isSelected` | Renders an option in the selection dropdown. `isSelected` is provided to determine the state.                                         |
| clear       | `clear`             | Renders a remove icon if any option is selected and `canClear` prop is true. The `clear` method should be used on `@mousedown` event. |
| no-options  |                     | Rendered if the options list is empty. By default renders `noOptionsText`.                                                            |
| no-results  |                     | Rendered if there are no search results. By default renders `noResultsText`.                                                          |

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
    clearCross: 'text-lg font-bold text-center pl-3',
    dropdown: 'max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full border border-gray-300 -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b',
    dropdownHidden: 'hidden',
    options: 'flex flex-col p-0 m-0 list-none',
    option: 'flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3 hover:text-gray-800 hover:bg-gray-100',
    optionSelected: 'text-white bg-orange-400 hover:bg-orange-500',
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
        optionSelected: [baseStyle.option, 'bg-gray-400 hover:bg-gray-500'],
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
