/* eslint-disable class-methods-use-this */
import { Browser, BrowserSettings } from "./Browser";

export default class BrowserFactory {
    private static browser?: Browser;

    static setBrowserSettings(settings: BrowserSettings) {
        BrowserFactory.browser = new Browser(settings);
    }

    static getBrowser() {
        return BrowserFactory.browser;
    }
}
