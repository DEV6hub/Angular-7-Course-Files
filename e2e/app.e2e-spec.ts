import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('shirt-shop-bootstrap App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display user signup form ', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Awesome!');
  });

  it('should click on save button in signup form ', () => {
    page.navigateTo();
    //debugger;
    element(by.id('name')).sendKeys('Gagan');
    element(by.id('email')).sendKeys('gagan@test.com');
    element(by.id('address1')).sendKeys('38 kittiwake avenue');
    element(by.id('address2')).sendKeys('blank');
    element(by.id('phone')).sendKeys('111-111-1111');
    element(by.id('city')).sendKeys('etobicoke');
    element(by.id('country')).element(by.cssContainingText('option', 'Canada')).click();
    element(by.id('province')).element(by.cssContainingText('option', 'Ontario')).click();
    element(by.id('postal')).sendKeys('m9v4p6');
    page.getSaveButton().click();
    expect(page.getCatalogText()).toContain('TSHIRTS DATABASE');
  });
});
