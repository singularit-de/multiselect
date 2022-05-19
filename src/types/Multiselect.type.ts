import {VNode} from 'vue';
import Option from "./option.type";

declare class Multiselect {
    modelValue?: any;
    selectOptions: any;
    placeholder?: string;
    multipleLabel?: string | Function;
    canClear?: boolean;
    disabled?: boolean;
    searchable?: boolean;
    closeOnSelect?: boolean;
    singleSelect?: boolean;

    $emit(eventName: 'select', e: { originalEvent: Event,  option: Option }): this;
    $emit(eventName: 'deselect', e: { originalEvent: Event, option: Option }): this;
    $emit(eventName: 'search-change', e: { originalEvent: Event, query: string }): this;
    $emit(eventName: 'open'): this;
    $emit(eventName: 'close'): this;
    $emit(eventName: 'clear'): this;

    $slots: {
        placeholder: VNode[];
        multipleLabel: VNode[];
        optionLabel: VNode[];
        clear: VNode[];
    }

}

export default Multiselect
