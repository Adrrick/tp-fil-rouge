
describe('tp-fil-rouge Home', () => {
  beforeEach(() => cy.visit('/'));

  it('should redirect me to home', () => {
    cy.url().should('include', '/home');
  });

  it('should display the popular category', () => {
    cy.get('h2').contains('Popular');
  });

  it('should display the Top rated category', () => {
    cy.get('h2').contains('Top rated');
  });

  it('should display the Upcoming category', () => {
    cy.get('h2').contains('Upcoming');
  });

  it('should display the login button', () => {
    cy.get('button.header--login').contains('Login');
  });
});

