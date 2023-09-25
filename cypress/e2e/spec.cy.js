describe('Test home page and form', () => {
  beforeEach(() => {
    cy.intercept("GET", 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urlData.json'
    }).as('getRequest')
    cy.intercept("POST",'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: {
        "long_url": "https://unsplash.com/photos/IUY_3DvM__w",
        "title": "roller coaster road",
        "id": 5,
        "short_url": "http://localhost:3001/useshorturl/5"
      }
    }).as('postRequest')
    .visit('http://localhost:3000/')
  })

  it('Home page should display application title', () => {
    cy.get('h1')
    cy.contains('URL Shortener')
  })

  it('Home page should display container with 2 previously shortened urls', () => {
    cy.wait('@getRequest')

    cy.get('.url').should('have.length', 2)
    cy.get('section > :nth-child(1)')
    cy.contains('h3', 'Awesome photo')
    cy.contains('a', 'http://localhost:3001/useshorturl/1')
    cy.contains('p', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')

    cy.get('section > :nth-child(2)')
    cy.contains('h3', 'hello')
    cy.contains('a', 'http://localhost:3001/useshorturl/4')
    cy.contains('p', 'https://unsplash.com/photos/HiE1bIIoRqQ')

  })

  it('Home page should display form with title input, url input, and shorten please button', () => {
    cy.get('form')
    cy.get('input[name="title"]')
     
    cy.get('input[name="url"]')

    cy.get('button')
      .contains('Shorten Please!')
    
  })

  it('Should capture input values in form and display new url on page upon submit', () => {
    cy.get('form')
    cy.get('input[name="title"]')
      .type('roller coaster road')
      .should('have.value', 'roller coaster road')

    cy.get('input[name="url"]')
      .type('https://unsplash.com/photos/IUY_3DvM__w')
      .should('have.value', 'https://unsplash.com/photos/IUY_3DvM__w')

    cy.get('button')
    cy.contains('Shorten Please!').click()

    cy.wait('@postRequest')
    cy.wait('@getRequest')

    cy.get('.url').should('have.length', 3)

    cy.get('section > :nth-child(3)')
    cy.contains('h3', 'roller coaster road')
    cy.contains('a', 'http://localhost:3001/useshorturl/5')
    cy.contains('p', 'https://unsplash.com/photos/IUY_3DvM__w')
  })

  it('Should display error message with 500 level GET request network error' , () => {
    cy.intercept("GET", 'http://localhost:3001/api/v1/urls', {
      statusCode: 500,
    })
    cy.get('h2')
    cy.contains('Request failed - please try again later.')
  })

})
