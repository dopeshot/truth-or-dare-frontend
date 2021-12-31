const api = `${Cypress.env('apiUrl')}`

Cypress.Commands.add('getSets', () => {
    cy.intercept('GET', `${api}/set`, {
        fixture: 'sets.json'
    }).as('getSets')
})

Cypress.Commands.add('getOneSet', () => {
    cy.intercept('GET', `${api}/set/**`, {
        fixture: 'set.json'
    }).as('getOneSet')
})

Cypress.Commands.add('login', () => {
    cy.intercept('POST', `${api}/auth/login`, {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhlbGxvIiwic3ViIjoiNjFhN2YxMDQ1ZDk5MTA1MWIzOTVhNTk1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQwODY5NzE3LCJleHAiOjE2NDA5MDU3MTd9.kiRFpaXTTXUuTjUFISm-lH5WLsQOBPEsDLzEBiC7B_Y"
    }).as('login')
})

Cypress.Commands.add('register', () => {
    cy.intercept('POST', `${api}/auth/register`, {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhlbGxvIiwic3ViIjoiNjFhN2YxMDQ1ZDk5MTA1MWIzOTVhNTk1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQwODY5NzE3LCJleHAiOjE2NDA5MDU3MTd9.kiRFpaXTTXUuTjUFISm-lH5WLsQOBPEsDLzEBiC7B_Y"
    }).as('register')
})

Cypress.Commands.add('getSetsFromUser', () => {
    cy.intercept('GET', `${api}/set/user/**`, {
        fixture: 'setsfromuser.json'
    }).as('getSetsFromUser')
})

Cypress.Commands.add('getEmptySetsFromUser', () => {
    cy.intercept('GET', `${api}/set/user/**`, []).as('getEmptySetsFromUser')
})

Cypress.Commands.add('overmind', () => {
    let overmind: any

    const cmd = Cypress.log({
        name: 'overmind',
        consoleProps() {
            return {
                Overmind: overmind
            }
        }
    })

    return (
        cy.window().then((window: any) => {
            overmind = window.overmind
            cmd.end()
            return overmind
        })
    )
})

export { }

