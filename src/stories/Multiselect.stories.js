import Multiselect from '../Multiselect.vue'
import '../index.css'

export default {
  title: 'Component/Multiselect',
  component: Multiselect,
  argTypes: {
    'onSelect': {
      action: 'selected',
    },
    'onDeselect': {
      action: 'deselect',
    },
    'onOpen': {
      action: 'open',
    },
    'onClose': {
      action: 'close',
    },
    'onSearch-change': {
      action: 'search-change',
    },
    'onClear': {
      action: 'clear',
    },
    'onUpdate:modelValue': {
      action: 'update:modelValue',
    },
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
  selectOptions: [{value: 1, label: 'Wie'}, {value: 'hallo', label: 'geht'}, {value: {nested: 'juhu'}, label: 'es'}, {value: true, label: 'dir'}],
}
