import {computed, ref, toRefs} from "vue";

export default function useMultiselect(props: any, context: any, dependencies: any) {

    const selectedValues = dependencies.selectedValues
    const selectedOptions = dependencies.selectedOptions
    const openDropdown = dependencies.openDropdown
    const closeDropdown = dependencies.closeDropdown
    const clearSearch = dependencies.clearSearch

    const {searchable, disabled, multipleLabel} = toRefs(props)

    const multiselect = ref(null)
    const isActive = ref(false)

    const tabindex = computed(() => searchable.value || disabled.value ? -1 : 0)

    function activate() {
        if (!disabled.value) {
            isActive.value = true
            openDropdown()
        }
    }

    function deactivate() {
        isActive.value = false

        setTimeout(() => {
            if (!isActive.value) {
                closeDropdown()
                clearSearch()
            }
        }, 1)
    }

    function clear() {
        selectedValues.value.length = 0
        deactivate()
        context.emit('clear')
    }

    const multipleLabelText = computed(() => {

        if (multipleLabel && multipleLabel.value) {
            if (typeof multipleLabel.value === 'string' || multipleLabel.value instanceof String) {
                return multipleLabel.value
            } else {
                return multipleLabel.value(selectedOptions.value)
            }
        } else {
            return selectedValues.value && selectedValues.value.length > 1 ? `${selectedValues.value.length} Optionen gewählt` : '1 Option gewählt'
        }
    })

    return {
        multiselect,
        isActive,
        tabindex,
        activate,
        deactivate,
        clear,
        multipleLabelText,
    }
}
