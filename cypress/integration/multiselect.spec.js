import {mount} from '@cypress/vue'
import MultiselectTester from "./MultiselectTester.vue"
import '../../src/index.css'
import './testStyling.css'
import {defaultTailwind} from "../../src";

describe('Multiselect Component', () => {
    it('Can be mounted', () => {
        mount(MultiselectTester)
        cy.get('[data-cy="multiselect"]').should('exist')
    })

    it('Can have a placeholder text', () => {
        mount(MultiselectTester, {
            props: {
                placeholder: 'test',
            }
        })
        cy.get('[data-cy="placeholder"]').should('be.visible')
    })

    it('Works as select input for single selections', () => {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]

        mount(MultiselectTester, {
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
        cy.get('[data-cy="label"]').contains('test')
        cy.get('[data-cy="selected"]').contains('4')
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="label"]').contains('This')
        cy.get('[data-cy="label"]').should('not.contain', 'test')
        cy.get('[data-cy="selected"]').contains('{ \"abc\": \"xyz\", \"test\": { \"xyz\": 3 } }')
        cy.get('[data-cy="selected"]').should('not.contain', 4)
        cy.get('[data-cy="clear"]').click()
        cy.get('[data-cy="label"]').should('not.exist')
        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="pushButton"]').click()
        cy.get('[data-cy="label"]').contains('is')
        cy.get('[data-cy="selected"]').contains('2')
        cy.get('[data-cy="pushButton"]').click()
        cy.get('[data-cy="selected"]').should('have.length', 1)
        cy.get('[data-cy="clear"]').trigger('mousedown')
        cy.get('[data-cy="illegalPushButton"]').click()
        cy.get('[data-cy="label"]').should('not.exist')
        cy.get('[data-cy="selected"]').should('be.empty')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="multiselect"]').trigger('focusout')
        cy.get('[data-cy="illegalPushButton"]').click()
        cy.get('[data-cy="label"]').should('not.exist')
        cy.get('[data-cy="selected"]').should('be.empty')

    })

    it('Works as select input for multiple selections', () => {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]
        mount(MultiselectTester, {
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
        cy.get('[data-cy="label"]').contains('1 Option gewählt')
        cy.get('[data-cy="selected"]').contains(4)
        cy.get('[data-cy="option"]').eq(2).click()
        cy.get('[data-cy="label"]').contains('2 Optionen gewählt')
        cy.get('[data-cy="selected"]').contains(4)
        cy.get('[data-cy="selected"]').contains('haha')
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="label"]').contains('3 Optionen gewählt')
        cy.get('[data-cy="selected"]').contains(4)
        cy.get('[data-cy="selected"]').contains('haha')
        cy.get('[data-cy="selected"]').contains('{ "abc": "xyz", "test": { "xyz": 3 } }')
        cy.get('[data-cy="option"]').eq(1).click()
        cy.get('[data-cy="label"]').contains('4 Optionen gewählt')
        cy.get('[data-cy="selected"]').contains(4)
        cy.get('[data-cy="selected"]').contains('haha')
        cy.get('[data-cy="selected"]').contains('{ "abc": "xyz", "test": { "xyz": 3 } }')
        cy.get('[data-cy="selected"]').contains(2)
        cy.get('[data-cy="option"]').eq(2).click()
        cy.get('[data-cy="label"]').contains('3 Optionen gewählt')
        cy.get('[data-cy="selected"]').should('not.contain', 'haha')
        cy.get('[data-cy="clear"]').click()
        cy.get('[data-cy="label"]').should('not.exist')
        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="pushButton"]').click()
        cy.get('[data-cy="label"]').should('exist')
        cy.get('[data-cy="label"]').contains('1 Option gewählt')
        cy.get('[data-cy="selected"]').contains('2')
        cy.get('[data-cy="pushButton"]').click()
        cy.get('[data-cy="label"]').contains('1 Option gewählt')
        cy.get('[data-cy="selected"]').should('have.length', 1)
        cy.get('[data-cy="illegalPushButton"]').click()
        cy.get('[data-cy="selected"]').should('have.length', 1)
        cy.get('[data-cy="label"]').contains('1 Option gewählt')
    })

    it('Can have a different label in single selection mode', ()=>{
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This', displayLabel:'Was'}, {value: 2, label: 'is', displayLabel: 'geht'}, {value: 'haha', label: 'a', displayLabel: 'denn'}, {value: 4, label: 'test', displayLabel: 'ab'}]
        mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                label: 'displayLabel'
            },
        })

        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="option"]').eq(3).click()
        cy.get('[data-cy="label"]').contains('ab')
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="label"]').contains('Was')
        cy.get('[data-cy="option"]').eq(1).click()
        cy.get('[data-cy="label"]').contains('geht')
    })

    it('Can have a different label in multiple selection mode', ()=>{
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This', displayLabel:'Was'}, {value: 2, label: 'is', displayLabel: 'geht'}, {value: 'haha', label: 'a', displayLabel: 'denn'}, {value: 4, label: 'test', displayLabel: 'ab'}]
        function multipleLabelFunc(selectedOptions) {
            let label = ''
            for (const option of selectedOptions) {
                label += `${option['displayLabel']} `
            }
            return label.slice(0, label.length-1)
        }
        mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                multiple: true,
                multipleLabel: multipleLabelFunc
            },
        })

        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="label"]').contains('Was')
        cy.get('[data-cy="option"]').eq(1).click()
        cy.get('[data-cy="label"]').contains('Was geht')
        cy.get('[data-cy="option"]').eq(2).click()
        cy.get('[data-cy="label"]').contains('Was geht denn')
        cy.get('[data-cy="option"]').eq(3).click()
        cy.get('[data-cy="label"]').contains('Was geht denn ab')
    })

    it('Can close the dropdown on selection', ()=>{
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]
        mount(MultiselectTester, {
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
    })

    it('Can have an input to search options', ()=>{
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]
        mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                searchable: true
            },
        })

        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="searchInput"').should('be.focused')
        cy.get('[data-cy="searchInput"').type('test')
        cy.get('[data-cy="dropdown"]').contains('test')
        cy.get('[data-cy="option"]').eq(0).should('not.be.visible')
        cy.get('[data-cy="option"]').eq(1).should('not.be.visible')
        cy.get('[data-cy="option"]').eq(2).should('not.be.visible')
    })

    it('Can be searched by values different to label', ()=>{
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This', displayLabel:'Was'}, {value: 2, label: 'is', displayLabel: 'geht'}, {value: 'haha', label: 'a', displayLabel: 'denn'}, {value: 4, label: 'test', displayLabel: 'ab'}]
        mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                searchable: true,
                label: 'displayLabel',
                trackBy: 'displayLabel'
            },
        })

        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="searchInput"').should('be.focused')
        cy.get('[data-cy="searchInput"').type('geht')
        cy.get('[data-cy="dropdown"]').contains('is')
        cy.get('[data-cy="option"]').eq(0).should('not.be.visible')
        cy.get('[data-cy="option"]').eq(2).should('not.be.visible')
        cy.get('[data-cy="option"]').eq(3).should('not.be.visible')
    })

    it('Can be disabled', ()=> {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]
        mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                disabled: true
            },
        })

        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('not.be.visible')

    })

    it('Can be tailwind styled via classes prop', ()=> {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'haha', label: 'a'}, {value: 4, label: 'test'}]
        mount(MultiselectTester, {
            props: {
                selectOptions: selectOptions,
                classes: {
                    spacer: [defaultTailwind.spacer, 'newHeight'],
                    optionSelected: [defaultTailwind.optionSelected, 'newSelected']
                }
            },
        })
        cy.get('[data-cy="spacer"]').should('have.class', 'newHeight')
        cy.get('[data-cy="spacer"]').should('have.css', 'height', '60px')
        cy.get('[data-cy="spacer"]').should('have.class', 'h-9')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="option"]').eq(0).should('have.css', 'background-color','rgb(96, 165, 250)')
        cy.get('[data-cy="option"]').eq(0).should('have.class', 'text-white')
    })
})