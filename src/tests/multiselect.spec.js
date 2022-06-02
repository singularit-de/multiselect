import {mount} from '@cypress/vue'
import MultiselectTester from "./MultiselectTester.vue"
import '../index.css'

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
        cy.get('.multiselect-placeholder').should('be.visible')
    })

    it('Works as select input for single selections', () => {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'test', label: 'a'}, {value: 4, label: 'test'}]

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
        cy.get('[data-cy="label"]').not('test')
        cy.get('[data-cy="selected"]').contains('{ \"abc\": \"xyz\", \"test\": { \"xyz\": 3 } }')
        cy.get('[data-cy="selected"]').not('4')
        cy.get('[data-cy="clear"]').click()
        cy.get('[data-cy="label"]').should('not.exist')
        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="pushButton"]').click()
        cy.get('[data-cy="label"]').should('exist')
        cy.get('[data-cy="selected"]').should('exist')
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
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'test', label: 'a'}, {value: 4, label: 'test'}]
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
        cy.get('[data-cy="selected"]').contains('test')
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="label"]').contains('3 Optionen gewählt')
        cy.get('[data-cy="selected"]').contains(4)
        cy.get('[data-cy="selected"]').contains('test')
        cy.get('[data-cy="selected"]').contains('{ "abc": "xyz", "test": { "xyz": 3 } }')
        cy.get('[data-cy="option"]').eq(1).click()
        cy.get('[data-cy="label"]').contains('4 Optionen gewählt')
        cy.get('[data-cy="selected"]').contains(4)
        cy.get('[data-cy="selected"]').contains('test')
        cy.get('[data-cy="selected"]').contains('{ "abc": "xyz", "test": { "xyz": 3 } }')
        cy.get('[data-cy="selected"]').contains(2)
        cy.get('[data-cy="option"]').eq(2).click()
        cy.get('[data-cy="label"]').contains('3 Optionen gewählt')
        cy.get('[data-cy="selected"]').not('test')
        cy.get('[data-cy="clear"]').click()
        cy.get('[data-cy="label"]').should('not.exist')
        cy.get('[data-cy="dropdown"]').should('not.be.visible')
        cy.get('[data-cy="pushButton"]').click()
        cy.get('[data-cy="label"]').should('exist')
        cy.get('[data-cy="label"]').contains('1 Option gewählt')
        cy.get('[data-cy="selected"]').should('exist')
        cy.get('[data-cy="selected"]').should('not.be.empty')
        cy.get('[data-cy="illegalPushButton"]').click()
        cy.get('[data-cy="selected"]').should('have.length', 1)
        cy.get('[data-cy="label"]').contains('1 Option gewählt')
    })

    it('Can close the dropdown on selection', ()=>{
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'test', label: 'a'}, {value: 4, label: 'test'}]
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
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'test', label: 'a'}, {value: 4, label: 'test'}]
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
        cy.get('[data-cy="dropdown"]').not('this')
        cy.get('[data-cy="dropdown"]').not('is')
        cy.get('[data-cy="dropdown"]').not('a')
    })

    it('Can be disabled', ()=> {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'test', label: 'a'}, {value: 4, label: 'test'}]
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
})