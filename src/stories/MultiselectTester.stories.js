import MultiselectTester from '../tests/MultiselectTester.vue';
import '../index.css';

export default {
    title: 'Component/Multiselect',
    component: MultiselectTester,
    argTypes: {
        onSelect: {
            action: 'selected'
        },
        onDeselect: {
            action: 'deselect'
        },
        onOpen: {
            action: 'open'
        },
        onClose: {
            action: 'close'
        },
        'onSearch-change': {
            action: 'search-change'
        },
        onClear: {
            action: 'clear'
        },
        'onUpdate:modelValue': {
            action: 'update:modelValue'
        }
    }
}

const Template = (args) => ({
    components: {MultiselectTester},
    setup() {
        return {args};
    },
    template: '<multiselect-tester v-bind="args"/>'
})

export const TesterComponent = Template.bind({});
TesterComponent.args={
    placeholder: 'huhu',
    selectOptions: [{value: 1, label: 'Wie'},{value: 'hallo', label: 'geht'},{value: {nested: 'juhu'}, label: 'es'},{value: true, label: 'dir'}]
}