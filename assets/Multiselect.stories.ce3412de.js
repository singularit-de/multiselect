import{M as e}from"./Multiselect.0475abb0.js";import"./vue.esm-bundler.fdd7e61a.js";import"./iframe.92153ff6.js";var c={parameters:{storySource:{source:`import Multiselect from '../Multiselect.vue';\r
import '../index.css';\r
\r
export default {\r
    title: 'Component/Multiselect',\r
    component: Multiselect,\r
    argTypes: {\r
        onSelect: {\r
            action: 'selected'\r
        },\r
        onDeselect: {\r
            action: 'deselect'\r
        },\r
        onOpen: {\r
            action: 'open'\r
        },\r
        onClose: {\r
            action: 'close'\r
        },\r
        'onSearch-change': {\r
            action: 'search-change'\r
        },\r
        onClear: {\r
            action: 'clear'\r
        },\r
        'onUpdate:modelValue': {\r
            action: 'update:modelValue'\r
        }\r
    }\r
}\r
\r
const Template = (args) => ({\r
    components: {Multiselect},\r
    setup() {\r
        return {args};\r
    },\r
    template: '<multiselect v-bind="args"/>'\r
})\r
\r
export const MultiselectComponent = Template.bind({});\r
MultiselectComponent.args={\r
    placeholder: 'huhu',\r
    selectOptions: [{value: 1, label: 'Wie'},{value: 'hallo', label: 'geht'},{value: {nested: 'juhu'}, label: 'es'},{value: true, label: 'dir'}]\r
}`,locationsMap:{"multiselect-component":{startLoc:{col:17,line:32},endLoc:{col:2,line:38},startBody:{col:17,line:32},endBody:{col:2,line:38}}}}},title:"Component/Multiselect",component:e,argTypes:{onSelect:{action:"selected"},onDeselect:{action:"deselect"},onOpen:{action:"open"},onClose:{action:"close"},"onSearch-change":{action:"search-change"},onClear:{action:"clear"},"onUpdate:modelValue":{action:"update:modelValue"}}};const t=n=>({components:{Multiselect:e},setup(){return{args:n}},template:'<multiselect v-bind="args"/>'}),l=t.bind({});l.args={placeholder:"huhu",selectOptions:[{value:1,label:"Wie"},{value:"hallo",label:"geht"},{value:{nested:"juhu"},label:"es"},{value:!0,label:"dir"}]};const s=["MultiselectComponent"];export{l as MultiselectComponent,s as __namedExportsOrder,c as default};
//# sourceMappingURL=Multiselect.stories.ce3412de.js.map
