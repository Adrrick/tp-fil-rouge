
describe('tp-fil-rouge Home', () => {
  beforeEach(() => cy.visit('/'));

  it('should redirect me to home', () => {
    cy.url().should('include', '/home');
  });

  it('should display the popular category', () => {
    cy.getBySel('section-title').eq(0).contains('Popular')
  });

  it('should display the Top rated category', () => {
    cy.getBySel('section-title').eq(1).contains('Top rated');
  });

  it('should display the Upcoming category', () => {
    cy.getBySel('section-title').eq(2).contains('Upcoming');
  });

  it('should display the login button', () => {
    cy.getBySel('login-button').contains('Login');
  });
});

