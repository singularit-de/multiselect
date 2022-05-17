import Option from "../types/option.type";
import _ from "lodash";
import {computed, watch} from "vue";

export default function useOptions(props: any, context: any, dependancies: any) {

    const selectedValues = dependancies.selectedValues

    const selectedOptions = computed(() => {
        const selected = []
        for (const option of props.selectOptions) {
            if (selectedValues.value.includes((option as Option).value)) {
                selected.push(option)
            }
        }
        return selected
    })

    watch(selectedOptions, (newSelected, oldSelected) => {
        if (newSelected.length < oldSelected.length) {
            context.emit('deselect')
        } else {
            context.emit('select')
        }
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
                        //option update hack
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

    function handleOptionClick(option: Option) {
        if (isSelected(option)) {
            const index = selectedValues.value.indexOf(option.value)
            selectedValues.value.splice(index, 1)
        } else {
            selectedValues.value.push(option.value)
        }
    }



    return {
        selectedOptions,
        isSelected,
        handleOptionClick
    }
}