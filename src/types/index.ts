export type Option = {
    value: any;
    label: string;
    [key: string]: any;
}

export type Classes = {
    container?: string|string[],
    containerDisabled?: string|string[],
    containerActive?: string|string[],
    label?: string|string[],
    search?: string|string[],
    placeholder?: string|string[],
    clear?: string|string[],
    clearCross?: string|string[],
    dropdown?: string|string[],
    dropdownHidden?: string|string[],
    options?: string|string[],
    option?: string|string[],
    optionSelected?: string|string[],
    optionNotShown?: string|string[],
    spacer?: string|string[],
}
