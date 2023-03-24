describe('tp-fil-rouge Profile', () => {
  beforeEach(() => {
    cy.logout();
    cy.visit('/');
  })


  it('should redirect to profile', () => {
    cy.login('test@test.com', '123456');

    cy.getBySel('avatar').click();

    cy.getBySel('avatar-menu-item').first().click();

    cy.url().should('match', /^.*\/profile/);
  })

  it('should display the profile details', () => {
    cy.login('test@test.com', '123456');

    cy.visit('/profile');

    cy.get('tp-fil-rouge-profile-details').should('be.visible');
  })

})