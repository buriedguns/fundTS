import { MainDonationWidget } from "./MainDonationWidget";
import { expect, Locator, Page } from "@playwright/test";
import * as allure from "allure-js-commons";

export class PaymentForm extends MainDonationWidget {
  public monthlyTab: Locator;
  public onceTab: Locator;
  public currencySelector: Locator;
  public amount: Locator;
  public donateContinueButton: Locator;
  public amountError: Locator;

  constructor(page: Page) {
    super(page);
    this.onceTab = this.donationWidgetFrame.getByTestId("less-frequent-button");
    this.monthlyTab = this.donationWidgetFrame.getByTestId(
      "more-frequent-button",
    );
    this.currencySelector =
      this.donationWidgetFrame.getByTestId("currency-selector");
    this.amount = this.donationWidgetFrame.getByTestId("amount");
    this.donateContinueButton =
      this.donationWidgetFrame.getByTestId("donate-button");
    this.amountError = this.donationWidgetFrame.locator(
      "[data-qa*=amount-popover]",
    );
  }

  async fillPaymentForm(
    amount: string,
    currency: string,
    monthly: boolean,
  ): Promise<void> {
    await allure.step(
      `Filling the ${monthly ? "monthly" : "once"} payment form with amount = ${amount} and currency = ${currency}\n`,
      async (): Promise<void> => {
        if (monthly) {
          await this.monthlyTab.click();
          await expect(this.monthlyTab).toHaveAttribute("aria-current", "true");
        } else {
          await this.onceTab.click();
          await expect(this.onceTab).toHaveAttribute("aria-current", "true");
        }
        await this.currencySelector.selectOption(currency);
        await this.amount.fill(amount);
        await this.donateContinueButton.click();
      },
    );
  }

  async checkAmountError(errorMessage: string): Promise<void> {
    await allure.step(
      `Checking the error message is visible and contains "${errorMessage}"`,
      async (): Promise<void> => {
        await expect(this.amountError).toBeVisible();
        await expect(this.amountError).toContainText(errorMessage);
      },
    );
  }
}
