/* eslint-disable class-methods-use-this */
import { Browser, BrowserSettings } from "./Browser";

export default class BrowserFactory {
    private static browser?: Browser;

    static setBrowserSettings(settings: BrowserSettings) {
        BrowserFactory.browser = new Browser(settings);
    }

    static setBrowser(browser: Browser) {
        BrowserFactory.browser = browser;
    }

    static getBrowser() {
        if (!BrowserFactory.browser) {
            throw new Error("No browser object found");
        }
        return BrowserFactory.browser;
    }
}
