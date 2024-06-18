


Cypress.Commands.add('Auth0Login', (user) => {
  const args = user;
      cy.origin('https://dev-z8i5zkg0.eu.auth0.com', { args }, ({ username, password }) => {
        cy.get('#username').type(username);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').contains(/^Continue$/).click();

      })
      cy.url().should('eq', 'http://localhost:5173/'); 
  
})