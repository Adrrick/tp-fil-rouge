describe('tp-fil-rouge Profile', () => {
  beforeEach(() => {
    cy.visit('/search');
  })

  it('should display the movies tab', () => {
    cy.getBySel('search-tabs').contains('Movies')
  })

  it('should display the users tab', () => {
    cy.getBySel('search-tabs').contains('Users')
  })

  it('should display by default the movies tab', () => {
    cy.getBySel('movies-tab').should('be.visible');
  })

  it('should display by the the users tab when click on users tab', () => {
    cy.get('#mat-tab-label-0-1').click();
    cy.getBySel('users-tab').should('be.visible');
  })

  it('should display the searchbar on users tab', () => {
    cy.get('#mat-tab-label-0-1').click();
    cy.getBySel('search-bar').should('be.visible');
  })

  it('should display the searchbar on movies tab', () => {
    cy.getBySel('search-bar').should('be.visible');
  })

  it('should display some spider man movies', () => {

    cy.intercept('https://api.themoviedb.org/3//search/movie?query=**').as("searchMovie");

    cy.getBySel('search-bar-input').type('Spider');

    cy.wait('@searchMovie');

    cy.getBySel('movie-card').contains('Spider');
  })
})