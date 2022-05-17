import {ref} from "vue";

export default function useSearch(props: any, context: any) {
    const search = ref('')

    function clearSearch() {
        search.value = ''
    }

    return {
        search,
        clearSearch
    }
}