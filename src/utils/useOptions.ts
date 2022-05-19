import Option from "../types/option.type";
import _ from "lodash";
import {computed, ref, toRefs, watch} from "vue";

export default function useOptions(props: any, context: any, dependencies: any) {
    const {selectOptions, closeOnSelect, singleSelect} = toRefs(props)

    const selectedValues = dependencies.selectedValues
    const search = dependencies.search
    const closeDropdown = dependencies.closeDropdown

    const shownOptions = ref<Option[]>(selectOptions.value)

    const selectedOptions = computed(() => {
        const selected = []
        for (const option of props.selectOptions) {
            if (isSelected(option)) {
                selected.push(option)
            }
        }
        return selected
    })

    function isSelected(option: Option) {
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
    }

    watch(props.modelValue, (value)=>{
        //basically does single select
        if (singleSelect.value && value.length > 1) {
            selectedValues.value.shift()
        }
        //prevents from pushing things that aren't options
        else if (selectedOptions.value.length < selectedValues.value.length) {
            selectedValues.value.pop()
        }
    })

    function isNotShown(option: Option) {
        return !option.label.includes(search.value)
    }

    function select(option: Option) {
        selectedValues.value.push(option.value)
        context.emit('select', option)
        if (closeOnSelect.value) {
            closeDropdown()
        }
    }

    function deselect(option: Option) {
        const index = selectedValues.value.indexOf(option.value)
        selectedValues.value.splice(index, 1)
        context.emit('deselect', option)
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
        shownOptions,
        isSelected,
        isNotShown,
        handleOptionClick
    }
}