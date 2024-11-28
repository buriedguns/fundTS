import { Page, FrameLocator, Locator } from "@playwright/test";

export class MainDonationWidget {
  /* Тут описываем общие элементы и методы по взаимодействию с donation widget */

  public page: Page;

  public donationWidgetFrame: FrameLocator;
  public creditCardFrame: FrameLocator;
  public expFrame: FrameLocator;
  public cvcFrame: FrameLocator;
  public closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.donationWidgetFrame = page.frameLocator(
      'iframe[title="Donation Widget"]',
    );
    this.creditCardFrame = this.donationWidgetFrame.frameLocator(
      'iframe[title*="card number"]',
    );
    this.expFrame = this.donationWidgetFrame.frameLocator(
      'Iframe[title*="expiration"]',
    );
    this.cvcFrame = this.donationWidgetFrame.frameLocator(
      'Iframe[title*="CVC"]',
    );
    this.closeButton = this.donationWidgetFrame.getByTestId("global-close");
  }
}
