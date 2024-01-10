/* eslint-disable class-methods-use-this */
import { Browser, BrowserSettings } from "./Browser";

export default class BrowserFactory {
    static setBrowserSettings(settings: BrowserSettings) {
        // @ts-ignore
        window.browser = new Browser(settings);
    }

    static getBrowser(): Browser {
        // @ts-ignore
        if (!window.browser) {
            throw new Error("No browser object found");
        }
        // @ts-ignore
        return window.browser as Browser;
    }
}
