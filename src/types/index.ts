export interface Option {
  value: unknown
  label: string
  disabled?: boolean
}

export interface Classes {
  container?: string | string[]
  containerDisabled?: string | string[]
  containerActive?: string | string[]
  label?: string | string[]
  search?: string | string[]
  placeholder?: string | string[]
  clear?: string | string[]
  clearIcon?: string | string[]
  dropdown?: string | string[]
  dropdownHidden?: string | string[]
  options?: string | string[]
  option?: string | string[]
  optionSelected?: string | string[]
  optionDisabled?: string | string[]
  noResults?: string | string[]
  noOptions?: string | string[]
  spacer?: string | string[]
}
