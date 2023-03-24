describe('tp-fil-rouge Explore', () => {
  beforeEach(() => cy.visit('/explore'))

  it('should display all genres', () => {
    const genres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'];

    genres.forEach((genre) =>
      cy.get('.genre-item').contains(genre)
    )
  })

  it('should redirect to the explore details page', () => {
    cy.get('.genre-item').first().click();
    cy.url().should('match', /^.*\/explore\/details\?with_genres=\d+$/);
  })
});

