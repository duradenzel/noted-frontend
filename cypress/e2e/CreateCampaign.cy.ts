
import secret from "../../secrets.json";

const user = {username: secret.testuser.username, password: secret.testuser.password}

describe('Create Campaign Flow', () => {
  it('Should create and display a new campaign', () => {
    cy.visit('http://localhost:5173');
    cy.get('button').contains('Log In').click();
    cy.Auth0Login(user);

    cy.intercept('POST', '/campaigns*', (req) => {
      console.log('Intercepted request:', req);
    }).as('createCampaign');

    cy.get('.create-campaign').click();
    cy.get('#title').type("New Campaign");
    cy.get('#description').type("New campaign description");
    cy.get('#maxplayers').clear().type('1');
    cy.get('#submit-campaign').click();

    cy.wait('@createCampaign').its('response.statusCode').should('eq', 200);

    cy.contains('New Campaign').should('be.visible');
  });
});