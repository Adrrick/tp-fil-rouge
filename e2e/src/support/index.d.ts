
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    /**
     *  Logs-in user by using UI
     */
    login(email: string, password: string): void;

    /**
     * 
     * Select an element with the test attribute (data-test='xxx')
     */
    getBySel(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
  }
}