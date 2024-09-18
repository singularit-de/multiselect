import {fn} from '@storybook/test'
import MultiselectTester from '../tests/MultiselectTester.vue'
import '../index.css'

export default {
  title: 'Component/Multiselect',
  component: MultiselectTester,
  args: {
    'onSelect': fn(),
    'onDeselect': fn(),
    'onOpen': fn(),
    'onClose': fn(),
    'onSearchChange': fn(),
    'onClear': fn(),
    'onUpdate:modelValue': fn(),
    'onLoadMore': fn(),
  },
}

const Template = args => ({
  components: {MultiselectTester},
  setup() {
    return {args}
  },
  template: '<multiselect-tester v-bind="args"/>',
})

export const TesterComponent = Template.bind({})
TesterComponent.args = {
  placeholder: 'huhu',
  selectOptions: [
    {value: 1, label: 'Wie'},
    {value: 'hallo', label: 'geht'},
    {value: {nested: 'juhu'}, label: 'es'},
    {value: true, label: 'dir'},
  ],
  vModel: true,
}
