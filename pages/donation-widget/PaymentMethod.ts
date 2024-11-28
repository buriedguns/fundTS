import { MainDonationWidget } from "./MainDonationWidget";
import { expect, Locator, Page } from "@playwright/test";
import * as allure from "allure-js-commons";

export class PaymentMethod extends MainDonationWidget {
  public coverTransactionCheckBox: Locator;
  public creditCardButton: Locator;

  constructor(page: Page) {
    super(page);
    this.coverTransactionCheckBox =
      this.donationWidgetFrame.getByTestId("cover-fee-checkbox");
    this.creditCardButton = this.donationWidgetFrame.getByTestId("cc-button");
  }

  async choosePaymentMethod(coverTransaction: boolean): Promise<void> {
    await allure.step(
      `Choosing the payment method`,
      async (): Promise<void> => {
        if (coverTransaction) {
          await this.coverTransactionCheckBox.check();
          await expect(this.coverTransactionCheckBox).toBeChecked();
        } else {
          await this.coverTransactionCheckBox.uncheck();
          await expect(this.coverTransactionCheckBox).not.toBeChecked();
        }
        await this.creditCardButton.click();
      },
    );
  }
}
