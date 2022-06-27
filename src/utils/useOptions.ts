import Option from "../types/option.type";
import _ from "lodash";
import {computed, toRefs, watch} from "vue";

export default function useOptions(props: any, context: any, dependencies: any) {
    const {closeOnSelect, multiple} = toRefs(props)

    const selectedValues = dependencies.selectedValues
    const closeDropdown = dependencies.closeDropdown

    const selectedOptions = computed<Option | Option[]>(() => {
        let selected = []
        for (const option of props.selectOptions) {
            if (isSelected(option)) {
                if (multiple.value) {
                    selected.push(option)
                } else {
                    selected = option
                    break
                }
            }
        }
        //prevents from pushing illegal stuff in single mode
        if (!multiple.value && Array.isArray(selected)) {
            selectedValues.value = null
            context.emit('update:modelValue', selectedValues.value)
        }
        return selected
    })

    function isSelected(option: Option) {
        if (multiple.value) {
            let find = null
            if (selectedValues.value && selectedValues.value.length > 0) {
                if (selectedValues.value.includes(option.value)) {
                    return true
                }
                //enable pushing values into modelValue correctly
                find = selectedValues.value.find((value: any, index: number) => {
                    if (_.isEqual(value, option.value)) {
                        //update value if option was pushed externally, because identical objects aren't equal
                        if (selectedValues.value[index] !== option.value) {
                            selectedValues.value.splice(index, 1, option.value)
                        }
                        return true
                    }
                })
            }
            return !!find;
        } else {
            if(!!selectedValues.value && _.isEqual(selectedValues.value, option.value)) {
                if (selectedValues.value !== option.value) {
                    selectedValues.value = option.value
                }
                return true
            } else {
                return false
            }
        }
    }

    watch(props.modelValue, ()=>{
        //prevents from pushing things that aren't options and pushing the same option multiple times in multiple mode
        if (multiple.value && (selectedOptions.value as Option[]).length < selectedValues.value.length) {
            selectedValues.value.pop()
        }
    })

    function select(option: Option) {
        multiple.value ? selectedValues.value.push(option.value) : selectedValues.value = option.value
        context.emit('select', option)
        context.emit('update:modelValue', selectedValues.value)
        if (closeOnSelect.value) {
            closeDropdown()
        }
    }

    function deselect(option: Option) {
        if (multiple.value) {
            const index = selectedValues.value.indexOf(option.value)
            selectedValues.value.splice(index, 1)
        } else {
            selectedValues.value = null
        }
        context.emit('deselect', option)
        context.emit('update:modelValue', selectedValues.value)
        if (closeOnSelect.value) {
            closeDropdown()
        }
    }

    function handleOptionClick(option: Option) {
        if (isSelected(option)) {
            deselect(option)
        } else {
            select(option)
        }
    }


    return {
        selectedOptions,
        isSelected,
        handleOptionClick
    }
}