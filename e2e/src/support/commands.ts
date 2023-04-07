Cypress.Commands.add('login', (email: string, password: string) => {
  const loginPath = `/login`

  const log = Cypress.log({
    name: "login",
    displayName: "LOGIN",
    message: [`🔐 Authenticating | ${email}`],
    autoEnd: false,
  });

  cy.intercept(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword**`).as('loginUser');

  cy.location("pathname", { log: false }).then((currentPath) => {
    if (currentPath !== loginPath) {
      cy.visit(loginPath);
    }
  });

  log.snapshot("before");

  cy.getBySel('login-email').type(email);
  cy.getBySel('login-password').type(password);

  cy.getBySel('login-submit').click();

  cy.wait("@loginUser").then((loginUser) => {
    log.set({
      consoleProps() {
        return {
          email,
          password,
          loginUser
        }
      }
    });
    log.snapshot("after");
    log.end();
  }).its('response.statusCode').should('eq', 200);
})

Cypress.Commands.add("logout", () => {
  const log = Cypress.log({
    name: "logout",
    displayName: "LOGOUT",
    message: [`🔐 Logout`],
    autoEnd: false,
  });

  log.snapshot("before");

  cy.visit('/logout');
});

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});
