import {computed, ref, toRefs} from "vue";

export default function useMultiselect(props: any, context: any, dependencies: any) {

    const selectedValues = dependencies.selectedValues
    const openDropdown = dependencies.openDropdown
    const closeDropdown = dependencies.closeDropdown
    const clearSearch = dependencies.clearSearch
    const dropdownOpen = dependencies.dropdownOpen

    const {searchable, disabled, multiple} = toRefs(props)

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

    function handleMousedown(e: MouseEvent) {
        if (!dropdownOpen.value && e.target === document.getElementById('multiselect')) {
            activate()
        } else if (dropdownOpen.value && e.target === document.getElementById('multiselect')) {
            setTimeout(() => {
                deactivate()
            }, 0)
        }
    }

    return {
        multiselect,
        isActive,
        tabindex,
        activate,
        deactivate,
        clear,
        handleMousedown,
    }
}
