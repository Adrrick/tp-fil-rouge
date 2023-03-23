Cypress.Commands.add('login', (email: string, password: string) => {
  const loginPath = `/login`

  cy.intercept(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjb2SJSC4eka0TQ5iQP-XYl4cVOYdcW7I`).as('loginUser');

  cy.location("pathname", { log: false }).then((currentPath) => {
    if (currentPath !== loginPath) {
      cy.visit(loginPath);
    }
  });

  cy.get('input#email').type(email);
  cy.get('input#password').type(password);

  cy.get('button.btn[type="submit"]').click();

  cy.wait("@loginUser");

})