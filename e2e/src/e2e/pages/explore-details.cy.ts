import { getPaginatorRangeLabel } from "e2e/src/support/paginator";

describe('tp-fil-rouge Explore Details', () => {
  beforeEach(() => cy.visit('/explore/details?with_genres=28'))

  const moviesNb = 20;

  it(`should display a grid of ${moviesNb} movies`, () => {
    cy.getBySel('grid-movies').find('tp-fil-rouge-movie-card').should('have.length', moviesNb);
  })

  it(`should have the pagination set to 1 - ${moviesNb}`, () => {
    getPaginatorRangeLabel().contains(`1 – ${moviesNb}`);
  })

  it(`should have the pagination set to ${moviesNb} - ${moviesNb * 2} when we click on next`, () => {
    cy.get('.mat-mdc-paginator-navigation-next').click();
    getPaginatorRangeLabel().contains(`${moviesNb + 1} – ${moviesNb * 2}`);
  })

  it(`should have the pagination set to 1 - ${moviesNb} when we click on previous`, () => {
    cy.visit('/explore/details?with_genres=28&page=2')
    cy.get('.mat-mdc-paginator-navigation-previous').click();
    getPaginatorRangeLabel().contains(`1 – ${moviesNb}`);
  })

  it('should redirect to login when we click on a movie', () => {
    cy.getBySel('movie-card').first().click();
    cy.url().should('include', '/login');
  })

  it('should redirect to the movie details when we click on a movie', () => {
    cy.login('test@test.com', 'test');

    cy.intercept('https://api.themoviedb.org/3//discover/movie?with_genres=28**').as('movies');

    cy.visit(`/explore/details?with_genres=28`);

    cy.wait('@movies');

    cy.getBySel('movie-card').first().click();
    cy.url().should('match', /^.*\/movie\/\d+$/);
  })
});