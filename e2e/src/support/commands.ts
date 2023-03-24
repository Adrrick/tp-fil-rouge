Cypress.Commands.add('login', (email: string, password: string) => {
  const loginPath = `/login`

  cy.intercept(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword**`).as('loginUser');
  cy.intercept(`https://identitytoolkit.googleapis.com/v1/accounts:lookup**`).as('lookupUser');

  cy.location("pathname", { log: false }).then((currentPath) => {
    if (currentPath !== loginPath) {
      cy.visit(loginPath);
    }
  });

  cy.getBySel('login-email').type(email);
  cy.getBySel('login-password').type(password);

  cy.getBySel('login-submit').click();

  cy.wait("@loginUser");
  cy.wait("@lookupUser");

})

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});