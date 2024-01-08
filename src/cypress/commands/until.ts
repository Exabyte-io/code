import isEqual from "lodash/isEqual";

export interface UntilProps<T = boolean> {
    it: () => Cypress.Chainable<JQuery<T> | Cypress.Chainable<T>>;
    become?: T;
    delay?: number;
    timeout?: number;
}

/**
 * @see https://github.com/cypress-io/cypress/issues/1936#issuecomment-536424157
 * @example
 *   it('should retry task', function() {
 *      let result = 0;
 *      cy.until({
 *          it: () => ++result,
 *          become: 3,
 *          timeout: 5000,
 *          delay: 500,
 *      });
 *  });
 */
Cypress.Commands.add(
    "until",
    <T>({
        it,
        become,
        delay = 500,
        timeout = Cypress.config("defaultCommandTimeout"),
    }: UntilProps<T>) => {
        cy.log("Until start:");
        let latestResult: unknown;
        setTimeout(() => {
            if (typeof become === "function") {
                // eslint-disable-next-line no-unused-expressions
                expect(become(latestResult), `${become}`).to.be.true;
            } else {
                expect(latestResult).to.be.equal(typeof become === "undefined" ? true : become);
            }
        }, timeout);

        const retry = () => {
            const originalResult = it();

            const wrappedResult = Cypress.isCy(originalResult)
                ? originalResult
                : cy.wrap(originalResult, { log: false });

            wrappedResult.then((result) => {
                latestResult = result;
                let checkResult = false;
                if (typeof become === "function") {
                    checkResult = become(result);
                } else {
                    checkResult = isEqual(result, typeof become === "undefined" ? true : become);
                }

                if (checkResult) {
                    cy.log(`Until end: "${result}" is expected`);
                    return cy.wrap(result, { log: false });
                }
                cy.log(`Until retry: "${result}" is not expected`);
                cy.wait(delay);
                return retry();
            });
        };

        return retry();
    },
);

declare global {
    interface UntilProps<T = boolean> {
        it: () => Cypress.Chainable;
        become?: T;
        delay?: number;
        timeout?: number;
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            until<T>(prop: UntilProps<T>): void;
            getIframeBody(selector: string): Chainable;
        }
    }
}
