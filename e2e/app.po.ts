import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root div h2')).getText();
  }

  getSaveButton() {
    return element(by.css('app-root div button'));
  }

  getCatalogText() {
    return element(by.css('app-catalog div nav')).getText();
  }
}
