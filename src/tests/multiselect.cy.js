import MultiselectTester from "./MultiselectTester.vue"
import '../index.css'
import {baseStyle} from "../utils";
import SMultiselect from "../Multiselect.vue";

describe('Multiselect Component', () => {
    it('should mount', () => {
        cy.mount(MultiselectTester)
        cy.get('[data-cy="multiselect"]').should('exist')
    })

    it('should have a placeholder text', () => {
        cy.mount(MultiselectTester, {
            props: {
                placeholder: 'test',
            }
        })
        cy.get('[data-cy="placeholder"]').should('be.visible')
    })

    it('should work as select input for single selections', () => {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 0, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]

        cy.mount(MultiselectTester, {
            props: {
                vModel: true,
                selectOptions: selectOptions,
            },
        })

        cy.get('[data-cy="multiselect"]').should('exist')
        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="option"]').eq(3).click()
        cy.get('[data-cy="value-display"]').contains('test')
        cy.get('[data-cy="selected"]').contains('4')
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="value-display"]').contains('This')
        cy.get('[data-cy="value-display"]').should('not.contain', 'test')
        cy.get('[data-cy="selected"]').contains('{ \"abc\": \"xyz\", \"test\": { \"xyz\": 3 } }')
        cy.get('[data-cy="selected"]').should('not.contain', 4)
        cy.get('[data-cy="clear"]').click()
        cy.get('[data-cy="value-display"]').should('not.exist')
        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="pushButton"]').click()
        cy.get('[data-cy="value-display"]').contains('is')
        cy.get('[data-cy="selected"]').contains('0')
        cy.get('[data-cy="pushButton"]').click()
        cy.get('[data-cy="selected"]').should('have.length', 1)
        cy.get('[data-cy="clear"]').trigger('mousedown')
        cy.get('[data-cy="illegalPushButton"]').click()
        cy.get('[data-cy="value-display"]').should('not.exist')
        cy.get('[data-cy="selected"]').should('be.empty')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="multiselect"]').trigger('focusout')
        cy.get('[data-cy="illegalPushButton"]').click()
        cy.get('[data-cy="value-display"]').should('not.exist')
        cy.get('[data-cy="selected"]').should('be.empty')

    })

    it('should work as select input for multiple selections', () => {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 0, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]
        cy.mount(MultiselectTester, {
            props: {
                vModel: true,
                selectOptions: selectOptions,
                multiple: true
            },
        })

        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="option"]').eq(3).click()
        cy.get('[data-cy="value-display"]').contains('1 Option gewählt')
        cy.get('[data-cy="selected"]').contains(4)
        cy.get('[data-cy="option"]').eq(2).click()
        cy.get('[data-cy="value-display"]').contains('2 Optionen gewählt')
        cy.get('[data-cy="selected"]').contains(4)
        cy.get('[data-cy="selected"]').contains('haha')
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="value-display"]').contains('3 Optionen gewählt')
        cy.get('[data-cy="selected"]').contains(4)
        cy.get('[data-cy="selected"]').contains('haha')
        cy.get('[data-cy="selected"]').contains('{ "abc": "xyz", "test": { "xyz": 3 } }')
        cy.get('[data-cy="option"]').eq(1).click()
        cy.get('[data-cy="value-display"]').contains('4 Optionen gewählt')
        cy.get('[data-cy="selected"]').contains(4)
        cy.get('[data-cy="selected"]').contains('haha')
        cy.get('[data-cy="selected"]').contains('{ "abc": "xyz", "test": { "xyz": 3 } }')
        cy.get('[data-cy="selected"]').contains(0)
        cy.get('[data-cy="option"]').eq(2).click()
        cy.get('[data-cy="value-display"]').contains('3 Optionen gewählt')
        cy.get('[data-cy="selected"]').should('not.contain', 'haha')
        cy.get('[data-cy="clear"]').click()
        cy.get('[data-cy="value-display"]').should('not.exist')
        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="pushButton"]').click()
        cy.get('[data-cy="value-display"]').should('exist')
        cy.get('[data-cy="value-display"]').contains('1 Option gewählt')
        cy.get('[data-cy="selected"]').contains(0)
        cy.get('[data-cy="pushButton"]').click()
        cy.get('[data-cy="value-display"]').contains('1 Option gewählt')
        cy.get('[data-cy="selected"]').should('have.length', 1)
        cy.get('[data-cy="illegalPushButton"]').click()
        cy.get('[data-cy="selected"]').should('have.length', 1)
        cy.get('[data-cy="value-display"]').contains('1 Option gewählt')
    })

    it('should have a different label in single selection mode', ()=>{
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This', displayLabel:'Was'}, {value: 2, label: 'is', displayLabel: 'geht'}, {value: 'haha', label: 'a', displayLabel: 'denn'}, {value: 4, label: 'test', displayLabel: 'ab'}]
        cy.mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                optionLabel: (option) => option.displayLabel
            },
        })

        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="option"]').eq(3).click()
        cy.get('[data-cy="value-display"]').contains('ab')
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="value-display"]').contains('Was')
        cy.get('[data-cy="option"]').eq(1).click()
        cy.get('[data-cy="value-display"]').contains('geht')
    })

    it('should have a different label in multiple selection mode', ()=>{
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This', displayLabel:'Was'}, {value: 2, label: 'is', displayLabel: 'geht'}, {value: 'haha', label: 'a', displayLabel: 'denn'}, {value: 4, label: 'test', displayLabel: 'ab'}]
        function multipleLabelFunc(selectedOptions) {
            let label = ''
            for (const option of selectedOptions) {
                label += `${option['displayLabel']} `
            }
            return label.slice(0, label.length-1)
        }
        cy.mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                multiple: true,
                displaySelectedValues: multipleLabelFunc
            },
        })

        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="value-display"]').contains('Was')
        cy.get('[data-cy="option"]').eq(1).click()
        cy.get('[data-cy="value-display"]').contains('Was geht')
        cy.get('[data-cy="option"]').eq(2).click()
        cy.get('[data-cy="value-display"]').contains('Was geht denn')
        cy.get('[data-cy="option"]').eq(3).click()
        cy.get('[data-cy="value-display"]').contains('Was geht denn ab')
    })

    it('should close the dropdown on selection', ()=>{
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]
        cy.mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                closeOnSelect: true
            },
        })

        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="option"]').eq(3).click()
        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
    })

    it('should have an input to search options', ()=>{
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]
        cy.mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                searchable: true
            },
        })

        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="search-input"]').should('be.focused')
        cy.get('[data-cy="search-input"]').type('test')
        cy.get('[data-cy="dropdown"]').contains('test')
        cy.get('[data-cy="dropdown"').should('not.contain', 'This')
        cy.get('[data-cy="dropdown"').should('not.contain', 'is')
        cy.get('[data-cy="dropdown"').should('not.contain', 'a')
    })

    it('should be searched by values different to label', ()=>{
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This', displayLabel:'Was'}, {value: 2, label: 'is', displayLabel: 'geht'}, {value: 'haha', label: 'a', displayLabel: 'denn'}, {value: 4, label: 'test', displayLabel: 'ab'}]
        cy.mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                searchable: true,
                noResultsText: 'nope',
                optionSearchValue: (option) => {return option.displayLabel}
            },
        })

        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="search-input"]').should('be.focused')
        cy.get('[data-cy="search-input"]').type('geht')
        cy.get('[data-cy="dropdown"]').contains('is')
        cy.get('[data-cy="dropdown"]').should('not.contain', 'This')
        cy.get('[data-cy="dropdown"]').should('not.contain', 'a')
        cy.get('[data-cy="dropdown"]').should('not.contain', 'test')

    })

    it('should be disabled', ()=> {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]
        cy.mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                disabled: true
            },
        })

        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('not.be.visible')

    })

    it('should be tailwind styled via classes prop', ()=> {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]
        cy.mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                classes: {
                    spacer: [baseStyle.spacer, 'h-[60px]'],
                    optionSelected: [baseStyle.option, 'bg-blue-400 hover:bg-blue-500']
                }
            },
        })
        cy.get('[data-cy="spacer"]').should('have.class', 'h-[60px]')
        cy.get('[data-cy="spacer"]').should('have.css', 'height', '60px')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="option"]').eq(0).should('have.css', 'background-color','rgb(96, 165, 250)')
        cy.get('[data-cy="option"]').eq(0).should('have.class', 'flex')
    })

    it('should automatically deselect dynamically removed select options', ()=>{
        cy.mount(MultiselectTester, {
            props: {
                vModel: true,
                dynamicOptions: true,
                multiple: true
            },
        })

        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="option"]').eq(3).click()
        cy.get('[data-cy="value-display"]').contains('1 Option gewählt')
        cy.get('[data-cy="selected"]').contains(4)
        cy.get('[data-cy="option"]').eq(2).click()
        cy.get('[data-cy="value-display"]').contains('2 Optionen gewählt')
        cy.get('[data-cy="selected"]').contains(4)
        cy.get('[data-cy="selected"]').contains('haha')
        cy.get('[data-cy="changeOptionsButton"]').click()
        cy.get('[data-cy="selected"]').should('not.contain', 4)
        cy.get('[data-cy="selected"]').contains('haha')
        cy.get('[data-cy="value-display"]').contains('1 Option gewählt')
    })

    it('should display a text if no options are available', () => {
        cy.mount(MultiselectTester, {
            props: {
                noOptionsText: 'Sorry, no options'
            },
        })

        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="dropdown"]').contains('Sorry, no options')
    })

    it('should display a text if there are no search results', () => {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]
        cy.mount(MultiselectTester, {
            props: {
                searchable: true,
                selectOptions: selectOptions,
                noResultsText: 'Sorry, no results'
            },
        })

        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="search-input"]').should('be.focused')
        cy.get('[data-cy="search-input"]').type('abcdefg')
        cy.get('[data-cy="dropdown"]').contains('Sorry, no results')
    })

    it('should take another attribute of the selected options as value', () => {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, actualValue: 1, label: 'This'}, {value: 2, actualValue: '', label: 'is'}, {value: 'haha', actualValue: 3, label: 'a'}, {value: 4, actualValue: 'test', label: 'test'}]
        cy.mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                optionValue: (option) => {
                    return option.actualValue
                },
                vModel: true
            }
        })

        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="option"]').eq(3).click()
        cy.get('[data-cy="selected"]').contains('test')
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="selected"]').contains(1)
    })

    it('should work with individually disabled options', () => {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, disabled: true, label: 'This'}, {value: 2, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]
        cy.mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                optionDisabled: (option, selectedOptions) => {
                    if (selectedOptions.length > 1)
                        return option.disabled
                },
                multiple: true,
            }
        })

        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="option"]').eq(0).should('not.have.css', 'background-color', 'rgb(229, 231, 235)')
        cy.get('[data-cy="option"]').eq(3).click()
        cy.get('[data-cy="value-display"]').contains('1 Option')
        cy.get('[data-cy="option"]').eq(2).click()
        cy.get('[data-cy="value-display"]').contains('2 Optionen')
        cy.get('[data-cy="option"]').eq(0).should('have.css', 'background-color', 'rgb(229, 231, 235)')
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="value-display"]').contains('2 Optionen')
    })

    it('should be programmatically focusable via exposed functions', () => {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]
        cy.mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                testExposedFunctions: true,
            }
        })

        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="blurButton"]').click()
        cy.get('[data-cy="focusButton"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="multiselect"]').should('be.focused')
        cy.wait(1000)
        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="multiselect"]').should('not.be.focused')

    })

    it('should do emits correctly', () => {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]
        const onUpdateModelValueSpy = cy.spy().as('update:modelValue')
        const onSelectSpy = cy.spy().as('select')
        const onDeselectSpy = cy.spy().as('deselect')
        const onOpenSpy = cy.spy().as('open')
        const onCloseSpy = cy.spy().as('close')
        const onSearchChangeSpy = cy.spy().as('search-change')
        const onClearSpy = cy.spy().as('clear')
        cy.mount(SMultiselect, {
            props: {
                selectOptions: selectOptions,
                searchable: true,
                'onUpdate:modelValue': onUpdateModelValueSpy,
                'onSelect': onSelectSpy,
                'onDeselect': onDeselectSpy,
                'onOpen': onOpenSpy,
                'onClose': onCloseSpy,
                'onSearchChange': onSearchChangeSpy,
                'onClear': onClearSpy,
            }
        })

        cy.get('[data-cy="multiselect"]').click()
        cy.get('@open').should('have.been.called')
        cy.get('[data-cy="search-input"]').should('be.focused')
        cy.get('[data-cy="search-input"]').type('s')
        cy.get('@search-change').should('have.been.calledWith', 's')
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('@select').should('have.been.calledWith', {value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'})
        cy.get('@update:modelValue').should('have.been.calledWith', {abc: 'xyz', test: {xyz: 3}})
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('@deselect').should('have.been.calledWith', {value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'})
        cy.get('[data-cy="option"]').eq(1).click()
        cy.get('@select').should('have.been.calledWith', {value: 2, label: 'is'})
        cy.get('@update:modelValue').should('have.been.calledWith', 2)
        cy.get('[data-cy="clear"]').click()
        cy.get('@clear').should('have.been.called')
        cy.get('[data-cy="multiselect"]').trigger('focusout')
        cy.get('@close').should('have.been.called')

    })
})