import {computed, ref, toRefs} from "vue";

export default function useMultiselect(props: any, context: any, dependencies: any) {

    const selectedValues = dependencies.selectedValues
    const selectedOptions = dependencies.selectedOptions
    const openDropdown = dependencies.openDropdown
    const closeDropdown = dependencies.closeDropdown
    const clearSearch = dependencies.clearSearch

    const {searchable, disabled, label, multipleLabel, multiple} = toRefs(props)

    const multiselect = ref(null)
    const isActive = ref(false)

    const tabindex = computed(() => searchable.value || disabled.value ? -1 : 0)

    function activate() {
        if (!disabled.value && !isActive.value) {
            isActive.value = true
            openDropdown()
        }
    }

    function deactivate() {
        if(isActive.value) {
            isActive.value = false
            setTimeout(() => {
                if (!isActive.value) {
                    closeDropdown()
                    clearSearch()
                }
            }, 1)
        }
    }

    function clear() {
        if (multiple.value) {
            selectedValues.value.length = 0
        } else {
            selectedValues.value = null
        }
        deactivate()
        context.emit('update:modelValue', selectedValues.value)
        context.emit('clear')
    }

    const labelText = computed(() => {
        if (multiple.value) {
            if (multipleLabel && multipleLabel.value) {
                if (typeof multipleLabel.value === 'string' || multipleLabel.value instanceof String) {
                    return multipleLabel.value
                } else {
                    return multipleLabel.value(selectedOptions.value)
                }
            } else {
                return selectedValues.value && selectedValues.value.length > 1 ? `${selectedValues.value.length} Optionen gewählt` : '1 Option gewählt'
            }
        } else {
            return (selectedOptions.value[label.value])
        }
    })

    return {
        multiselect,
        isActive,
        tabindex,
        activate,
        deactivate,
        clear,
        labelText,
    }
}
