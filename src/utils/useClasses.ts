import {computed, toRefs} from "vue";
import Option from "../types/option.type";
import "../index.css"

export default function useClasses(props: any, context: any, dependencies: any) {
    const refs = toRefs(props)
    const disabled = refs.disabled
    const trackBy = refs.trackBy

    const dropdownOpen = dependencies.dropdownOpen
    const isSelected = dependencies.isSelected
    const isActive = dependencies.isActive
    const search = dependencies.search

    const classes = {
        container: 'multiselect',
        containerDisabled: 'is-disabled',
        containerOpen: 'dropdown-open',
        containerActive: 'isActive',
        label: 'multiselect-label',
        search: 'multiselect-search',
        placeholder: 'multiselect-placeholder',
        clear: 'multiselect-clear',
        clearCross: 'multiselect-clear-x',
        dropdown: 'multiselect-dropdown',
        dropdownHidden: 'is-hidden',
        options: 'multiselect-options',
        option: 'multiselect-option',
        optionSelected: 'is-selected',
        optionNotShown: 'is-hidden',
        spacer: 'multiselect-spacer',
        ...refs.classes.value
    }

    const classList = computed(()=> {
        return {
            container: [classes.container]
                .concat(disabled.value ? classes.containerDisabled : [])
                .concat(dropdownOpen.value ? classes.containerOpen: [])
                .concat(isActive.value ? classes.containerActive: []),
            label: classes.label,
            search: classes.search,
            placeholder: classes.placeholder,
            clear: classes.clear,
            clearCross: classes.clearCross,
            dropdown: [classes.dropdown]
                .concat(dropdownOpen.value ? [] : classes.dropdownHidden),
            options: classes.options,
            option: (o: Option) => {
                const option = [classes.option]
                if (isSelected(o)) {
                    option.push(classes.optionSelected)
                }
                if (search && search.value && !o[trackBy.value].toLowerCase().includes(search.value.toLowerCase())) {
                    option.push(classes.optionNotShown)
                }
                return option
            },
            spacer: classes.spacer,
        }
    })
    return {
        classList
    }
}