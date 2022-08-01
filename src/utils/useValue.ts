import {computed, ref, toRef, watch} from "vue";

export default function useValue(props: any, context: any) {
    const multiple = toRef(props, 'multiple')

    const selectedValues = ref<any>(props.modelValue)

    //for externally pushing things -> updates selectedValues
    watch(() => props.modelValue, (newValue) => {
        if (newValue !== selectedValues.value) {
            selectedValues.value = props.modelValue
        }
    })

    const noSelection = computed(() => {
        if (multiple.value) {
            return !(selectedValues.value && selectedValues.value.length > 0)
        } else {
            return !(selectedValues.value || selectedValues.value === 0 || selectedValues.value === '')
        }
    })

    return {
        selectedValues,
        noSelection
    }
}
