import {mount} from '@cypress/vue'
import Multiselect from "./Multiselect.vue";
import './index.css'

describe('Multiselect Component', () => {
    it('Mounts the Component', () => {
        mount(Multiselect)
        cy.get('[data-cy="multiselect"]').should('exist')
    })

    it('Can have a placeholder text', () => {
        mount(Multiselect, {
            props: {
                placeholder: 'test',
            }
        })
        cy.get('.multiselect-placeholder').should('be.visible')
    })

    it('Has working styling', () => {
        mount(Multiselect, {
            props: {
                modelValue: null,
                selectOptions: [{value: 1, label: 'This'}, {value: 2, label: 'is'}, {value: 3, label: 'a'}, {value: 4, label: 'test'}]
            },
        })
        cy.get('[data-cy="multiselect"]').should('have.css', 'border')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('be.visible')
        cy.get('[data-cy="option"]').should('be.visible')
        cy.get('[data-cy="option"]').eq(3).trigger('mouseover')
    })

    it('Works as select input for single selections', () => {
        // const selected = ref()
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'test', label: 'a'}, {value: 4, label: 'test'}]

        mount(Multiselect, {
            props: {
                selectOptions: selectOptions
            },
        })

        cy.get('[data-cy="multiselect"]').should('exist')
        cy.get('[data-cy="dropdown"]').should('have.class', 'is-hidden')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('not.have.class', 'is-hidden')
        cy.get('[data-cy="option"]').eq(3).click()
        cy.get('[data-cy="label"]').contains('test')
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="label"]').contains('This')
        cy.get('[data-cy="label"]').not('test')
        cy.get('[data-cy="clear"]').click()
        cy.get('[data-cy="label"]').should('not.exist')
        cy.get('[data-cy="dropdown"]').should('have.class', 'is-hidden')
    })

    it('Works as select input for multiple selections', () => {
        const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'test', label: 'a'}, {value: 4, label: 'test'}]
        mount(Multiselect, {
            props: {
                selectOptions: selectOptions,
                multiple: true
            },
        })

        cy.get('[data-cy="dropdown"]').should('have.class', 'is-hidden')
        cy.get('[data-cy="multiselect"]').click()
        cy.get('[data-cy="dropdown"]').should('not.have.class', 'is-hidden')
        cy.get('[data-cy="option"]').eq(3).click()
        cy.get('[data-cy="label"]').contains('1 Option gewählt')
        cy.get('[data-cy="option"]').eq(2).click()
        cy.get('[data-cy="label"]').contains('2 Optionen gewählt')
        cy.get('[data-cy="option"]').eq(0).click()
        cy.get('[data-cy="label"]').contains('3 Optionen gewählt')
        cy.get('[data-cy="option"]').eq(1).click()
        cy.get('[data-cy="label"]').contains('4 Optionen gewählt')
        cy.get('[data-cy="option"]').eq(2).click()
        cy.get('[data-cy="label"]').contains('3 Optionen gewählt')
        cy.get('[data-cy="clear"]').click()
        cy.get('[data-cy="label"]').should('not.exist')
        cy.get('[data-cy="dropdown"]').should('have.class', 'is-hidden')
    })


    it('values can be pushed from external component', () => {
        const testComponent = {
            template: `
<div class="mt-3 mx-5">
    <Multiselect v-model="selected" :select-options="selectOptions"/>
    <button @click="push({abc: 'xyz', test: {xyz: 3}})" class="mt-4 text-center w-full border-2 bg-gray-100">Push a value</button>
    <span>selected values:</span>
    <ul>
        <li v-for="(select, id) in selected" :key="id">{{select}}</li>
    </ul>
</div>`,
            components: {Multiselect},
            data() {
                return{
                    selected: null,
                    selectOptions: [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'test', label: 'a'}, {value: 4, label: 'test'}]
                }
            },
            methods: {
                push(value) {
                    this.selected = value
                }
            }
            // setup() {
            //     const selected = ref()
            //     const selectOptions = [{value: {abc: 'xyz', test: {xyz: 3}}, label: 'This'}, {value: 2, label: 'is'}, {value: 'test', label: 'a'}, {value: 4, label: 'test'}]
            //     function push(value) {
            //         selected.value = value
            //     }
            //     return {
            //         selected, selectOptions, push
            //     }
            // }
        }

        const options = {
            extensions: {
                components: {
                    'test-component': testComponent
                }
            }
        }

        mount({template: `<test-component/>`}, options)

        cy.get('[data-cy="multiselect"]').should('exist')


    })
})