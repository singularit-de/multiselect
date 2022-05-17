import {computed, ref, watch} from "vue";

export default function useValue(props: any, context: any) {
    const selectedValues = ref<any>(props.modelValue)

    watch(selectedValues, (newSelected, oldSelected) => {
        context.emit('update:modelValue', newSelected)
    })

    const noSelection = computed(() => {
        return !(selectedValues.value && selectedValues.value.length > 0)
    })

    return {
        selectedValues,
        noSelection
    }
}
