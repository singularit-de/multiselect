import {computed, ref, toRef, watch} from "vue";

export default function useValue(props: any, context: any) {
    const multiple = toRef(props, 'multiple')

    const selectedValues = ref<any>(props.modelValue)

    watch(selectedValues, (newSelected) => {
        context.emit('update:modelValue', newSelected)
    })

    const noSelection = computed(() => {
        if (multiple.value) {
            return !(selectedValues.value && selectedValues.value.length > 0)
        } else {
            return !selectedValues.value
        }
    })

    return {
        selectedValues,
        noSelection
    }
}
