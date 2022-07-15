import{d as v,t as h,r as d,e as n,p as g,g as o,j as p,F as V,l as q,m as f,q as M,u as T,o as s}from"./vue.esm-bundler.fdd7e61a.js";import{_ as C,M as B}from"./Multiselect.bda445fb.js";import"./iframe.94971474.js";const m=v({name:"MultiselectTester",components:{Multiselect:B},props:{vModel:{type:Boolean,required:!1,default:!1},multiple:{type:Boolean,required:!1,default:!1},label:{type:String,required:!1,default:"label"},multipleLabel:{type:[Function,String],required:!1},selectOptions:{type:Array,required:!1,default:()=>[]},placeholder:{type:String,required:!1},canClear:{type:Boolean,required:!1,default:!0},disabled:{type:Boolean,required:!1,default:!1},searchable:{type:Boolean,required:!1,default:!1},inputType:{type:String,required:!1,default:"text"},trackBy:{type:String,required:!1,default:"label"},closeOnSelect:{type:Boolean,required:!1,default:!1},classes:{type:Object,required:!1,default:()=>({})}},setup(e){const{vModel:a,multiple:r,selectOptions:i}=h(e);let t;a.value&&(r.value?t=d([]):t=d());function c(){if(a.value){const l=i.value[1].value;r.value?t.value.push(l):t.value=l}}function u(){if(a.value){const l={this:"Hallo",is:1234,a:{Test:"okayyy, let's go"}};r.value?t.value.push(l):t.value=l}}return{selected:t,pushValue:c,pushIllegalValue:u}}}),k={class:"mt-3 mx-5 flex flex-col"},O={key:0},S={key:1,class:"mt-4"},L=o("span",null,[M("selected values:"),o("br")],-1),N={key:0},j={key:1,"data-cy":"selected"};function I(e,a,r,i,t,c){const u=T("Multiselect");return s(),n("div",k,[g(u,{modelValue:e.selected,"onUpdate:modelValue":a[0]||(a[0]=l=>e.selected=l),canClear:e.canClear,"close-on-select":e.closeOnSelect,disabled:e.disabled,"input-type":e.inputType,multiple:e.multiple,label:e.label,"multiple-label":e.multipleLabel,placeholder:e.placeholder,searchable:e.searchable,"track-by":e.trackBy,"select-options":e.selectOptions,classes:e.classes},null,8,["modelValue","canClear","close-on-select","disabled","input-type","multiple","label","multiple-label","placeholder","searchable","track-by","select-options","classes"]),e.vModel?(s(),n("div",O,[o("button",{class:"mt-4 text-center w-full border-2 bg-gray-100","data-cy":"pushButton",onClick:a[1]||(a[1]=(...l)=>e.pushValue&&e.pushValue(...l))},"Push a random value from Options "),o("button",{class:"mt-4 text-center w-full border-2 bg-gray-100","data-cy":"illegalPushButton",onClick:a[2]||(a[2]=(...l)=>e.pushIllegalValue&&e.pushIllegalValue(...l))},"Push an illegal Value ")])):p("",!0),e.vModel?(s(),n("div",S,[L,e.multiple?(s(),n("ul",N,[(s(!0),n(V,null,q(e.selected,(l,b)=>(s(),n("li",{key:b,"data-cy":"selected"},f(l),1))),128))])):(s(),n("span",j,f(e.selected),1))])):p("",!0)])}var y=C(m,[["render",I]]);m.__docgenInfo={displayName:"MultiselectTester",exportName:"default",description:"",tags:{},props:[{name:"vModel",type:{name:"boolean"},required:!1,defaultValue:{func:!1,value:"false"}},{name:"multiple",type:{name:"boolean"},required:!1,defaultValue:{func:!1,value:"false"}},{name:"label",type:{name:"string"},required:!1,defaultValue:{func:!1,value:"'label'"}},{name:"multipleLabel",type:{name:"func|string"},required:!1},{name:"selectOptions",type:{name:"array"},required:!1,defaultValue:{func:!1,value:""}},{name:"placeholder",type:{name:"string"},required:!1},{name:"canClear",type:{name:"boolean"},required:!1,defaultValue:{func:!1,value:"true"}},{name:"disabled",type:{name:"boolean"},required:!1,defaultValue:{func:!1,value:"false"}},{name:"searchable",type:{name:"boolean"},required:!1,defaultValue:{func:!1,value:"false"}},{name:"inputType",type:{name:"string"},required:!1,defaultValue:{func:!1,value:"'text'"}},{name:"trackBy",type:{name:"string"},required:!1,defaultValue:{func:!1,value:"'label'"}},{name:"closeOnSelect",type:{name:"boolean"},required:!1,defaultValue:{func:!1,value:"false"}},{name:"classes",type:{name:"Classes"},required:!1,defaultValue:{func:!0,value:"()=>({})"}}]};var w={parameters:{storySource:{source:`import MultiselectTester from '../tests/MultiselectTester.vue';\r
import '../index.css';\r
\r
export default {\r
    title: 'Component/Multiselect',\r
    component: MultiselectTester,\r
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
    components: {MultiselectTester},\r
    setup() {\r
        return {args};\r
    },\r
    template: '<multiselect-tester v-bind="args"/>'\r
})\r
\r
export const TesterComponent = Template.bind({});\r
TesterComponent.args={\r
    placeholder: 'huhu',\r
    selectOptions: [{value: 1, label: 'Wie'},{value: 'hallo', label: 'geht'},{value: {nested: 'juhu'}, label: 'es'},{value: true, label: 'dir'}],\r
    vModel: true\r
}`,locationsMap:{"tester-component":{startLoc:{col:17,line:32},endLoc:{col:2,line:38},startBody:{col:17,line:32},endBody:{col:2,line:38}}}}},title:"Component/Multiselect",component:y,argTypes:{onSelect:{action:"selected"},onDeselect:{action:"deselect"},onOpen:{action:"open"},onClose:{action:"close"},"onSearch-change":{action:"search-change"},onClear:{action:"clear"},"onUpdate:modelValue":{action:"update:modelValue"}}};const $=e=>({components:{MultiselectTester:y},setup(){return{args:e}},template:'<multiselect-tester v-bind="args"/>'}),D=$.bind({});D.args={placeholder:"huhu",selectOptions:[{value:1,label:"Wie"},{value:"hallo",label:"geht"},{value:{nested:"juhu"},label:"es"},{value:!0,label:"dir"}],vModel:!0};const E=["TesterComponent"];export{D as TesterComponent,E as __namedExportsOrder,w as default};
//# sourceMappingURL=MultiselectTester.stories.90812508.js.map
