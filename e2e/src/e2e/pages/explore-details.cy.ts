
describe('tp-fil-rouge Explore Details', () => {
  beforeEach(() => cy.visit('/explore/details?with_genres=28'))

  const moviesNb = 20;

  it(`should display a grid of ${moviesNb} movies`, () => {
    cy.get('.auto-grid-movies').find('tp-fil-rouge-movie-card').should('have.length', moviesNb);
  })

  it(`should have the pagination set to 1 - ${moviesNb}`, () => {

    cy.get('.mat-mdc-paginator-range-label').contains(`1 – ${moviesNb}`);
  })

  it(`should have the pagination set to ${moviesNb} - ${moviesNb * 2} when we click on next`, () => {
    cy.get('.mat-mdc-paginator-navigation-next').click();
    cy.get('.mat-mdc-paginator-range-label').contains(`${moviesNb + 1} – ${moviesNb * 2}`);
  })

  it(`should have the pagination set to 1 - ${moviesNb} when we click on previous`, () => {
    cy.get('.mat-mdc-paginator-navigation-next').click();
    cy.get('.mat-mdc-paginator-navigation-previous').click();
    cy.get('.mat-mdc-paginator-range-label').contains(`1 – ${moviesNb}`);
  })

  it('should redirect us to login when we click on a movie', () => {
    cy.get('tp-fil-rouge-movie-card').first().click();
    cy.url().should('include', '/login');
  })

  it('should redirect us to login when we click on a movie', () => {
    cy.login('test@test.com', 'test');

    cy.intercept({
      method: 'GET',
      url: 'https://api.themoviedb.org/3//discover/movie?with_genres=28&page=1&api_key=41770330e49047aac35ce453ac66b586',
    }).as('dataGetFirst');

    cy.visit(`/explore/details?with_genres=28`);

    cy.wait('@dataGetFirst');

    cy.get('tp-fil-rouge-movie-card').first().click();
    cy.url().should('match', /^.*\/movie\/\d+$/);
  })
});