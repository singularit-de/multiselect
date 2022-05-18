import {ref, watch} from "vue";

export default function useSearch(props: any, context: any) {
    const search = ref('')

    function clearSearch() {
        search.value = ''
    }

    function handleInput(e: any) {
        search.value = e.target.value
    }

    watch(search, (val) => {
        context.emit('search-change', val)
    })

    return {
        search,
        clearSearch,
        handleInput
    }
}