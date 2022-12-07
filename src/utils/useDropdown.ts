import {ref} from "vue";

export default function useDropdown(props: any, context: any) {

    const dropdownOpen = ref(false)

    function openDropdown() {
        dropdownOpen.value = true
        context.emit('open')
    }

    function closeDropdown() {
        dropdownOpen.value = false
        context.emit('close')
    }


    return {
        dropdownOpen,
        openDropdown,
        closeDropdown,
    }
}