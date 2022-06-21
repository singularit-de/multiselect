# sIT Multiselect Komponente test 2 3

## Requirements
+ node v14.16.0

## Setup
Run `npm install` to install dependencies.

## Tests
Run `npm run cypress:open` to start cypress testing server. 
The cypress test environment will open itself in a browser automatically.

## Storybook
Run `npm run storybook` to start storybook server.

## Default Tailwind Classes

These are the default Tailwind classes used for styling the component.

```
{
    container: 'h-auto relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-300 bg-white rounded text-base leading-snug outline-none',
    containerDisabled: 'cursor-default',
    containerOpen: 'rounded-b-none',
    containerActive: 'ring ring-opacity-70 ring-orange-400',
    label: 'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5',
    search: 'w-full absolute inset-0 outline-none appearance-none box-border border-0 text-base font-sans bg-white rounded pl-3.5',
    placeholder: 'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 text-gray-400',
    clear: 'pr-3.5 relative z-10 opacity-40 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80',
    clearCross: 'text-lg font-bold text-center pl-3',
    dropdown: 'max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full border border-gray-300 -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b',
    dropdownHidden: 'hidden',
    options: 'flex flex-col p-0 m-0 list-none',
    option: 'flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3 hover:text-gray-800 hover:bg-gray-100',
    optionSelected: 'text-white bg-orange-400 hover:bg-orange-500',
    optionNotShown: 'hidden',
    spacer: 'h-9 py-px box-content',
}
```

[//]: # (To customize them use the classes prop like this:)

[//]: # ()
[//]: # (If you want to completely re-style some elements from ground up:)

[//]: # (```)

[//]: # (<Multiselect ... )

[//]: # (    :classes='{)

[//]: # (        container: 'some new tailwind classes',)

[//]: # (        ... )

[//]: # (        }')

[//]: # (/>    )

[//]: # (```)

[//]: # ()
[//]: # (If you just want to change a few things like color, size, etc., import defaultTailwind and use it)

[//]: # (like this:)

[//]: # (```)

[//]: # (<Multiselect ... )

[//]: # (    :classes='{)

[//]: # (        container: [defaultTailwind.container, newContainerCSS],)

[//]: # (        ... )

[//]: # (        }')

[//]: # (/>)

[//]: # ()
[//]: # (<style>)

[//]: # (.newContainerCSS {)

[//]: # (    @apply border-orange-500)

[//]: # (})

[//]: # (</style>    )

[//]: # (```)
