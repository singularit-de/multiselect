import {ref} from "vue";

export default function useDropdown(props: any, context: any) {

    const dropdownOpen = ref(false)

    function openDropdown() {
        dropdownOpen.value = true
    }

    function closeDropdown() {
        dropdownOpen.value = false
    }


    return {
        dropdownOpen,
        openDropdown,
        closeDropdown,
    }
}