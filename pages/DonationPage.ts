import { Page, FrameLocator, Locator } from "@playwright/test";
import * as allure from "allure-js-commons";
import { UserDonate } from "../models/User";
import { Urls } from "../models/Config";
import { CreditCardForm } from "./donation-widget/CreditCardForm";
import { PaymentForm } from "./donation-widget/PaymentForm";
import { PaymentMethod } from "./donation-widget/PaymentMethod";
import { UserForm } from "./donation-widget/UserForm";

export class DonationPage {
  public page: Page;
  public url: string;

  public donationButtonFrame: FrameLocator;
  public donationButton: Locator;
  public creditCardForm: CreditCardForm;
  public paymentForm: PaymentForm;
  public paymentMethod: PaymentMethod;
  public userForm: UserForm;

  constructor(page: Page) {
    this.url = new Urls().mainPage;
    this.donationButtonFrame = page.frameLocator(
      'iframe[title="Donate Button"]',
    );
    this.donationButton = this.donationButtonFrame.getByTestId("fun-element");
    this.creditCardForm = new CreditCardForm(page);
    this.paymentForm = new PaymentForm(page);
    this.paymentMethod = new PaymentMethod(page);
    this.userForm = new UserForm(page);
    this.page = page;
  }

  async open(): Promise<void> {
    await allure.step("Open the page", async (): Promise<void> => {
      await this.page.goto(this.url);
    });
  }
  async donate(userDonate: UserDonate): Promise<void> {
    await this.donationButton.click();
    await this.paymentForm.fillPaymentForm(
      userDonate.amount,
      userDonate.currency,
      userDonate.monthly,
    );
    await this.userForm.fillUserDataForm(
      userDonate.user.firstName,
      userDonate.user.lastName,
      userDonate.user.email,
    );
    await this.paymentMethod.choosePaymentMethod(userDonate.coverTransaction);
    await this.creditCardForm.fillCardForm(
      userDonate.card.cardNumber,
      userDonate.card.expDate,
      userDonate.card.cvc,
    );
  }
}
