/* eslint-disable class-methods-use-this */
import "@cypress/xpath";

export interface BrowserSettings {
    renderTimeoutShort: number;
}

export class IframeBrowser {
    settings: BrowserSettings;

    #body: Cypress.Chainable;

    constructor(settings: BrowserSettings, selector: string) {
        this.settings = settings;

        this.#body = cy
            .get(selector, { timeout: this.settings.renderTimeoutShort })
            .its("0.contentDocument.body")
            .should("not.be.empty", {})
            // wraps "body" DOM element to allow
            // chaining more Cypress commands, like ".find(...)"
            // https://on.cypress.io/wrap
            .then(cy.wrap);
    }

    waitForVisible(selector: string, timeout = this.settings.renderTimeoutShort) {
        return this.#body.find(selector, { timeout }).should("be.visible");
    }

    setInputValue(selector: string, value: string | number, clear = true) {
        const input = this.#body.find(selector);

        if (clear) {
            return input.clear().type(value.toString());
        }

        return input.type(value.toString());
    }

    select(selector: string, value: string) {
        return this.#body.find(selector).select(value);
    }
}

export class Browser {
    readonly settings: BrowserSettings;

    constructor(settings: BrowserSettings) {
        this.settings = settings;
    }

    go(path: string) {
        return cy.visit(path);
    }

    iframe(selector: string) {
        return new IframeBrowser(this.settings, selector);
    }

    waitForVisible(selector: string, timeout = this.settings.renderTimeoutShort) {
        return cy.get(selector, { timeout }).should("be.visible");
    }

    waitForDisappear(selector: string, timeout = this.settings.renderTimeoutShort) {
        return cy.get(selector, { timeout }).should("not.exist");
    }

    waitForHide(selector: string, timeout = this.settings.renderTimeoutShort) {
        return cy.get(selector, { timeout }).should("be.hidden");
    }

    waitForExist(selector: string, timeout = this.settings.renderTimeoutShort) {
        return cy.get(selector, { timeout }).should("exist");
    }

    waitForValue(selector: string, timeout = this.settings.renderTimeoutShort) {
        return cy.get(selector, { timeout }).should("exist");
    }

    /**
     * @summary Clear the field, and then set its value
     * @param selector {String} CSS selector for the field in question
     * @param value {String} The final value to be left in the field
     */
    setInputValue(selector: string, value: string | number, clear = true) {
        const input = cy.get(selector);

        if (clear) {
            return input.clear().type(value.toString());
        }

        return input.type(value.toString());
    }

    setInputValueByXpath(selector: string, value: string | number, clear = true) {
        const input = cy.xpath(selector);

        if (clear) {
            return input.clear().type(value.toString());
        }

        return input.type(value.toString());
    }

    select(selector: string, value: string) {
        return cy.get(selector).select(value);
    }

    click(selector: string, options?: Partial<Cypress.ClickOptions>) {
        return cy.get(selector).click(options);
    }

    clickIfExists(selector: string) {
        cy.document().then(($document) => {
            const documentResult = $document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
            if (documentResult.length) {
                documentResult.forEach((item) => item.click());
            }
        });
    }

    geInputValue(selector: string) {
        return cy.get(selector).invoke("val");
    }

    getInputValueByXpath(path: string) {
        return cy.xpath(path).invoke("val");
    }

    clickByXpath(path: string) {
        return cy.xpath(path).click();
    }

    clickOnText(text: string) {
        return cy.contains(text).click();
    }

    execute<T = unknown>(cb: (win: Cypress.AUTWindow) => T) {
        return cy.window().then((win) => cb(win));
    }

    isVisible(selector: string) {
        return cy.get(selector).then(($el): boolean => $el.is(":visible"));
    }

    uploadFileFromFilePath(selector: string, filePath: string) {
        return cy.get(selector).selectFile(filePath, { force: true });
    }

    // serverExecute<R = unknown, T = any>(
    //     cb: (params: T) => R,
    //     args: T,
    // ): Cypress.Chainable<R | null> {
    //     // @ts-ignore
    //     return this.execute((win) => {
    //         return new Cypress.Promise<R | null>((resolve, reject) => {
    //             win.Meteor.call(
    //                 "xolvio/backdoor",
    //                 cb.toString(),
    //                 [args],
    //                 (error: object, result: { value?: R }) => {
    //                     if (error) {
    //                         return reject(error);
    //                     }
    //                     resolve(result.value || null);
    //                 },
    //             );
    //         });
    //     });
    // }

    getElementText(selector: string) {
        return cy.get(selector).invoke("text");
    }
}
