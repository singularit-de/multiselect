import {fn} from '@storybook/test'
import Multiselect from '../Multiselect.vue'
import '../index.css'

export default {
  title: 'Component/Multiselect',
  component: Multiselect,
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
  components: {Multiselect},
  setup() {
    return {args}
  },
  template: '<multiselect v-bind="args"/>',
})

export const MultiselectComponent = Template.bind({})
MultiselectComponent.args = {
  placeholder: 'huhu',
  selectOptions: [
    {value: 1, label: 'Wie'},
    {value: 'hallo', label: 'geht'},
    {value: {nested: 'juhu'}, label: 'es'},
    {value: true, label: 'dir'},
  ],
}
