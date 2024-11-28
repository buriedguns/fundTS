import { MainDonationWidget } from "./MainDonationWidget";
import { Locator, Page } from "@playwright/test";
import * as allure from "allure-js-commons";

export class UserForm extends MainDonationWidget {
  public firstName: Locator;
  public lastName: Locator;
  public email: Locator;
  public submitPersonalDataButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = this.donationWidgetFrame.getByTestId(
      "personal-first-name",
    );
    this.lastName = this.donationWidgetFrame.getByTestId("personal-last-name");
    this.email = this.donationWidgetFrame.getByTestId("personal-email");
    this.submitPersonalDataButton =
      this.donationWidgetFrame.getByTestId("privacy-continue");
  }

  async fillUserDataForm(
    firstName: string,
    lastName: string,
    email: string,
  ): Promise<void> {
    await allure.step(
      `Filling the user data: ${firstName}, ${lastName} and ${email}`,
      async (): Promise<void> => {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.submitPersonalDataButton.click();
      },
    );
  }
}
