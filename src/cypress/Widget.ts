import { Browser } from "./Browser";
import BrowserFactory from "./BrowserFactory";

const modalBackdrop = ".modal-backdrop.fade";

export default class Widget {
    selector: string;

    browser: Browser;

    constructor(selector: string) {
        this.selector = selector;
        this.browser = BrowserFactory.getBrowser();
    }

    waitForVisible() {
        return this.browser.waitForVisible(this.selector);
    }

    waitForDisappear(timeout?: number) {
        return this.browser.waitForDisappear(this.selector, timeout);
    }

    waitForLoaderToDisappear() {
        return this.browser.waitForDisappear(this.getWrappedSelector("div.spinner"));
    }

    getWrappedSelector(selector: string, separator = " ") {
        return `${this.selector}${separator}${selector}`;
    }

    /**
     * @summary Wraps the selectors, including functions, passed at the top level of config object
     */
    getWrappedSelectors<T extends object>(config: T): T {
        const entries = Object.keys(config).map((key) => {
            // @ts-ignore
            const value = config[key];
            let newValue;
            switch (typeof value) {
                case "string":
                    newValue = this.getWrappedSelector(value);
                    break;
                case "function":
                    newValue = (...args: unknown[]) => this.getWrappedSelector(value(...args));
                    break;
                default:
                    newValue = value;
            }
            return [key, newValue];
        });
        return Object.fromEntries(entries);
    }

    waitForModalBackdropDisappear() {
        this.browser.waitForDisappear(modalBackdrop);
    }
}
