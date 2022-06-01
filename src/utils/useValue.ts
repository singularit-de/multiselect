import {computed, ref, toRef, watch} from "vue";

export default function useValue(props: any, context: any) {
    const multiple = toRef(props, 'multiple')

    const selectedValues = ref<any>(props.modelValue)

    watch(selectedValues, (newSelected) => {
        if (newSelected !== props.modelValue) {
            context.emit('update:modelValue', newSelected)
        }
    })

    //for externally pushing things
    watch(() => props.modelValue, (newValue) => {
        if (newValue !== selectedValues.value) {
            console.log('hey')
            selectedValues.value = props.modelValue
        }
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
