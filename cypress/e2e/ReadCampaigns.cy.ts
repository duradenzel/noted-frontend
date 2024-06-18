import secret from "../../secrets.json";

const user = {username: secret.testuser.username, password: secret.testuser.password}

describe('Read Campaigns Flow', () => {
  it('Should display the list of campaigns', () => {
    cy.visit('http://localhost:5173');
    cy.get('button').contains('Log In').click();
    cy.Auth0Login(user);

    cy.intercept('GET', '/campaigns*').as('getCampaigns');

    cy.wait('@getCampaigns').its('response.statusCode').should('eq', 200);

    cy.get('.campaign-card').should('have.length.greaterThan', 0);
  });
});
