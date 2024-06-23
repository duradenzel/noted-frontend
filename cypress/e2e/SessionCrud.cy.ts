import secret from "../../secrets.json";

const user = {username: secret.testuser.username, password: secret.testuser.password}

const testCampaign = {
  title: 'SESSION CAMPAIGN',
  description: 'This is a test campaign for session testing.',
  maxPlayers: 3
};

const testSession = {
  title: 'TEST SESSION',
  summary: 'This is a test session.',
  date: "2024-12-12"
};

beforeEach(() => {
  cy.visit('http://localhost:5173');
  cy.get('button').contains('Log In').click();
  cy.Auth0Login(user);

});

describe('Session CRUD Operations', () => {
  it('Should Create a new session', () => {
    cy.intercept('POST', '/campaigns*').as('createCampaign');
    cy.intercept('POST', '/sessions*').as('createSession');
    cy.get('#create-campaign-button').click();
    cy.get('#title').type(testCampaign.title);
    cy.get('#description').type(testCampaign.description);
    cy.get('#maxplayers').clear().type(testCampaign.maxPlayers.toString());
    cy.get('#submit-campaign').click();
    cy.wait('@createCampaign').its('response.statusCode').should('eq', 200);
    cy.contains('SESSION CAMPAIGN').click();
    cy.get("#create-session-button").click();
    cy.get('#title').type(testSession.title);
    cy.get('#summary').type(testSession.summary);
    cy.get('#date').clear().type(testSession.date);
    cy.get('#submit-campaign').click();
    cy.wait('@createSession').its('response.statusCode').should('eq', 200);
    cy.reload();
    cy.contains(testSession.title).should('exist');
  });

  it('Should Edit the new session', () => {
    cy.contains(testCampaign.title).click();
    cy.get('#edit-session-button').click();
    cy.get('#session-summary-edit').clear().type("EDITED SESSION SUMMARY");
    cy.get('#session-save-button').click();

    cy.reload();
    cy.contains('EDITED SESSION SUMMARY').should('exist');

  });

  it('Should delete the new session', () => {
    cy.contains(testCampaign.title).click();
    cy.get('#delete-session-button').click();
    cy.reload();
    cy.contains('EDITED SESSION SUMMARY').should('not.exist');

  });

  it('Should delete the test campaign', () => {
    // Delete the test campaign
    cy.intercept('DELETE', '/campaigns/*').as('deleteCampaign');
    cy.contains('SESSION CAMPAIGN').click();
    cy.get('#campaign-delete-button').click();
    cy.contains('Continue').click();

    cy.wait('@deleteCampaign').its('response.statusCode').should('eq', 200);
    cy.contains('SESSION CAMPAIGN').should('not.exist');

  });

  it('Should show error when session title is empty', () => {
    cy.contains('SESSION CAMPAIGN').click();
    cy.get("#create-session-button").click();
    cy.get('#summary').type(testSession.summary);
    cy.get('#date').clear().type(testSession.date);
    cy.get('#submit-campaign').click();
    cy.contains('All fields are required.').should('be.visible');
  });

  it('Should show error when session summary is empty', () => {
    cy.contains('SESSION CAMPAIGN').click();
    cy.get("#create-session-button").click();
    cy.get('#title').type(testSession.title);
    cy.get('#date').clear().type(testSession.date);
    cy.get('#submit-campaign').click();
    cy.contains('All fields are required.').should('be.visible');
  });

  it('Should show error when session date is empty', () => {
    cy.contains('SESSION CAMPAIGN').click();
    cy.get("#create-session-button").click();
    cy.get('#title').type(testSession.title);
    cy.get('#summary').type(testSession.summary);
    cy.get('#date').clear();
    cy.get('#submit-campaign').click();
    cy.contains('All fields are required.').should('be.visible');
  });


})