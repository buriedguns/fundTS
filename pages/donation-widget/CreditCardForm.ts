import { MainDonationWidget } from "./MainDonationWidget";
import { expect, Page, Locator } from "@playwright/test";
import * as allure from "allure-js-commons";

export class CreditCardForm extends MainDonationWidget {
  public cardNumberInput: Locator;
  public expInput: Locator;
  public cvcInput: Locator;
  public cardContinueButton: Locator;
  public errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cardNumberInput = this.creditCardFrame.locator(
      '.InputContainer [name="cardnumber"]',
    );
    this.expInput = this.expFrame.locator('input[name="exp-date"]');
    this.cvcInput = this.cvcFrame.locator('input[name="cvc"]');
    this.cardContinueButton =
      this.donationWidgetFrame.getByTestId("card-continue");
    this.errorMessage = this.donationWidgetFrame.getByTestId(
      "card-continue-error-title",
    );
  }

  async fillCardForm(
    cardNumber: string,
    expDate: string,
    cvc: string,
  ): Promise<void> {
    await allure.step(`Filling the card form`, async (): Promise<void> => {
      await this.cardNumberInput.fill(cardNumber);
      await this.expInput.fill(expDate);
      await this.cvcInput.fill(cvc);
      await this.cardContinueButton.click();
    });
  }

  async checkError(errorMessage: string): Promise<void> {
    await allure.step(
      `Checking the error message is visible and contains "${errorMessage}"`,
      async (): Promise<void> => {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(errorMessage);
      },
    );
  }
}
