import {computed, toRefs} from "vue"
import {Option} from "../types"
import "../index.css"
import {defaultTheme} from "./defaultTheme"

export default function useClasses(props: any, context: any, dependencies: any) {
    const refs = toRefs(props)
    const disabled = refs.disabled
    const trackBy = refs.trackBy

    const dropdownOpen = dependencies.dropdownOpen
    const isSelected = dependencies.isSelected
    const isActive = dependencies.isActive
    const search = dependencies.search

    const classes = {
        // container: 'multiselect',
        // containerDisabled: 'is-disabled',
        // containerOpen: 'dropdown-open',
        // containerActive: 'isActive',
        // label: 'multiselect-label',
        // search: 'multiselect-search',
        // placeholder: 'multiselect-placeholder',
        // clear: 'multiselect-clear',
        // clearCross: 'multiselect-clear-x',
        // dropdown: 'multiselect-dropdown',
        // dropdownHidden: 'is-hidden',
        // options: 'multiselect-options',
        // option: 'multiselect-option',
        // optionSelected: 'is-selected',
        // optionNotShown: 'is-hidden',
        // spacer: 'multiselect-spacer',
        ...defaultTheme,
        ...refs.classes.value
    }

    const classList = computed(()=> {
        let container = classes.container
        if (disabled.value) {
            container = classes.containerDisabled
        } else if (isActive.value) {
            container = classes.containerActive
        }

        let dropdown = classes.dropdownHidden
        if (dropdownOpen.value) {
            dropdown = classes.dropdown
        }

        return {
            container: container,
            label: classes.label,
            search: classes.search,
            placeholder: classes.placeholder,
            clear: classes.clear,
            clearCross: classes.clearCross,
            dropdown: dropdown,
            options: classes.options,
            option: (o: Option) => {
                let option = classes.option
                if (isSelected(o)) {
                    option = classes.optionSelected
                }
                if (search && search.value && !o[trackBy.value].toLowerCase().includes(search.value.toLowerCase())) {
                    option = classes.optionNotShown
                }
                return option
            },
            spacer: classes.spacer,
        }
    })
    return {
        defaultTheme,
        classList,
    }
}