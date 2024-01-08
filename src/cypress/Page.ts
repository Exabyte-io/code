import Widget from "./Widget";

export default class Page extends Widget {
    url = "/";

    open() {
        this.browser.go(this.url);
        this.waitForVisible();
        this.waitForLoaderToDisappear();
    }
}
