import secret from "../../secrets.json";

const user = {username: secret.testuser.username, password: secret.testuser.password}

const testCampaign = {
  title: 'TEST CAMPAIGN',
  description: 'This is a test campaign.',
  maxPlayers: 3
};
describe('Campaign CRUD Operations', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.get('button').contains('Log In').click();
    cy.Auth0Login(user);

  });


  it('Should Create a new campaigns', () => {
    cy.intercept('POST', '/campaigns*').as('createCampaign');
    cy.get('.create-campaign').click();
    cy.get('#title').type(testCampaign.title);
    cy.get('#description').type(testCampaign.description);
    cy.get('#maxplayers').clear().type(testCampaign.maxPlayers.toString());
    cy.get('#submit-campaign').click();
    cy.wait('@createCampaign').its('response.statusCode').should('eq', 200);
  });


  it('Should display the list of campaigns', () => {
    cy.intercept('GET', '/campaigns*').as('getCampaigns');
    
    cy.wait('@getCampaigns').its('response.statusCode').should('eq', 200);
    cy.get('.campaign-card').should('have.length.greaterThan', 0);
    cy.contains('TEST CAMPAIGN').should('be.visible');
  });

 
  it('Should update the test campaign', () => {
    

    cy.get('.campaign-card').contains('TEST CAMPAIGN').click();

    cy.get('#campaign-title').clear().type('UPDATED TEST CAMPAIGN');

    // Click the save button
    cy.get('#campaign-edit-button').click();

    cy.wait(1000);

    // Wait for the save operation to complete
  });

  it('Should verify the edited campaign', () => {
    cy.contains('UPDATED TEST CAMPAIGN').should('be.visible');
  });

  it('Should delete the test campaign', () => {
    // Delete the test campaign
    cy.intercept('DELETE', '/campaigns/*').as('deleteCampaign');
    cy.contains('UPDATED TEST CAMPAIGN').click();
    cy.get('#campaign-delete-button').click();
    cy.contains('Continue').click();

    cy.wait('@deleteCampaign').its('response.statusCode').should('eq', 200);

  });

  it('Should verify the deleted campaign', () => {
    cy.contains('UPDATED TEST CAMPAIGN').should('not.exist');

  });

  it('Should show error when title is empty', () => {
    cy.get('.create-campaign').click();
    cy.get('#description').type(testCampaign.description);
    cy.get('#maxplayers').clear().type(testCampaign.maxPlayers.toString());
    cy.get('#submit-campaign').click();
    cy.contains('All fields are required.').should('be.visible');
  });

  it('Should show error when description is empty', () => {
    cy.get('.create-campaign').click();
    cy.get('#title').type(testCampaign.title);
    cy.get('#maxplayers').clear().type(testCampaign.maxPlayers.toString());
    cy.get('#submit-campaign').click();
    cy.contains('All fields are required.').should('be.visible');
  });

  it('Should show error when maxplayers is empty', () => {
    cy.get('.create-campaign').click();
    cy.get('#title').type(testCampaign.title);
    cy.get('#description').type(testCampaign.description);
    cy.get('#maxplayers').clear();
    cy.get('#submit-campaign').click();
    cy.contains('All fields are required.').should('be.visible');
  });

  it('Should show error when maxplayers is less than 1', () => {
    cy.get('.create-campaign').click();
    cy.get('#title').type(testCampaign.title);
    cy.get('#description').type(testCampaign.description);
    cy.get('#maxplayers').clear().type('0');
    cy.get('#submit-campaign').click();
    cy.contains('Max players must be at least 1.').should('be.visible');
  });

  it('Should show error when maxplayers is not a number', () => {
    cy.get('.create-campaign').click();
    cy.get('#title').type(testCampaign.title);
    cy.get('#description').type(testCampaign.description);
    cy.get('#maxplayers').clear().type('abc');
    cy.get('#submit-campaign').click();
    cy.contains('Max players must be at least 1.').should('be.visible');
  });
});
