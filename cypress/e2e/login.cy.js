/**
 * test scenario for login flow (End-to-End Testing)
 *
 * - Login spec
 *  - should display login page correctly
 *  - should display error message when login with invalid credentials
 *  - should redirect to homepage when login with valid credentials
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    cy.get('#login-email').should('be.visible');
    cy.get('#login-password').should('be.visible');
    cy.get('button').contains('Masuk ke Forum').should('be.visible');
    cy.contains('Selamat Datang Kembali').should('be.visible');
  });

  it('should display error message when login with invalid credentials', () => {
    // Intercept login request to simulate failure
    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'email or password is wrong',
      },
    }).as('loginRequest');

    cy.get('#login-email').type('invalid@user.com');
    cy.get('#login-password').type('wrongpassword');
    cy.get('button').contains('Masuk ke Forum').click();

    cy.wait('@loginRequest');
    cy.contains('email or password is wrong').should('be.visible');
  });

  it('should redirect to homepage when login with valid credentials', () => {
    // Intercept login request
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          token: 'fake-jwt-token-12345',
        },
      },
    }).as('loginRequest');

    // Intercept profile request
    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: {
            id: 'user-valid-1',
            name: 'Pengguna Uji',
            email: 'pengguna@test.com',
            avatar: 'https://example.com/avatar.jpg',
          },
        },
      },
    }).as('profileRequest');

    // Intercept threads and users for homepage
    cy.intercept('GET', '**/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          threads: [],
        },
      },
    });

    cy.intercept('GET', '**/users', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          users: [],
        },
      },
    });

    cy.get('#login-email').type('pengguna@test.com');
    cy.get('#login-password').type('passwordrahasia');
    cy.get('button').contains('Masuk ke Forum').click();

    cy.wait('@loginRequest');
    cy.wait('@profileRequest');

    // Verify redirected to homepage
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
