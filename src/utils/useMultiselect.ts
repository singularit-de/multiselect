import {computed, ref, toRef, toRefs} from "vue";

export default function useMultiselect(props: any, context: any, dependancies: any) {

    const selectedValues = dependancies.selectedValues
    const selectedOptions = dependancies.selectedOptions
    const openDropdown = dependancies.openDropdown
    const closeDropdown = dependancies.closeDropdown
    const clearSearch = dependancies.clearSearch

    const {searchable, disabled} = toRefs(props)

    const multiselect = ref(null)
    const isActive = ref(false)

    const tabindex = computed(() => searchable.value || disabled.value ? -1 : 0)

    function activate() {
        isActive.value = true
        openDropdown()
    }

    function deactivate() {
        isActive.value = false
        closeDropdown()
        clearSearch()
    }

    function clear() {
        selectedValues.value = []
        deactivate()
        context.emit('clear')
    }

    const multipleLabelText = computed(() => {
        const multipleLabelRef = toRef(props, 'multipleLabel')
        if (multipleLabelRef && multipleLabelRef.value) {
            return multipleLabelRef.value(selectedOptions.value)
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
