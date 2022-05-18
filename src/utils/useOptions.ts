import Option from "../types/option.type";
import _ from "lodash";
import {computed, ref, toRef} from "vue";

export default function useOptions(props: any, context: any, dependancies: any) {

    const selectOptions = toRef(props, 'selectOptions')

    const selectedValues = dependancies.selectedValues
    const search = dependancies.search

    const shownOptions = ref<Option[]>(selectOptions.value)

    const selectedOptions = computed(() => {
        const selected = []
        for (const option of props.selectOptions) {
            if (isSelected(option)) {
                selected.push(option)
            }
        }
        if (selected.length < selectedValues.value.length) {
            selectedValues.value.pop()
        }
        return selected
    })

    function isSelected(option: Option) {
        let find = null
        if (selectedValues.value && selectedValues.value.length > 0) {
            if (selectedValues.value.includes(option.value)) {
                return true
            }
            find = selectedValues.value.find((value: any, index: number) => {
                if (_.isEqual(value, option.value)) {
                    if (selectedValues.value[index] !== option.value) {
                        //value update
                        option.value = selectedValues.value[index]
                        selectedValues.value.push(option.value)
                        selectedValues.value.pop()
                    }
                    return true
                }
            })
        }
        return !!find;
    }

    function isNotShown(option: Option) {
        return !option.label.includes(search.value)
    }

    function select(option: Option) {
        selectedValues.value.push(option.value)
        context.emit('select')
    }

    function deselect(option: Option) {
        const index = selectedValues.value.indexOf(option.value)
        selectedValues.value.splice(index, 1)
        context.emit('deselect')
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