import { test } from "@playwright/test";
import * as allure from "allure-js-commons";
import { DonationPage } from "../pages/DonationPage";
import { UserDonate } from "../models/User";

test.describe("Test donations", () => {
  test.beforeAll(async () => {
    await allure.epic("Donations tests");
  });

  test("Test payment with invalid card", async ({ page }) => {
    await allure.story("Test payment with invalid card");

    const expectedErrorMsg: string = "declined";
    const userDonate: UserDonate = new UserDonate();
    const donationPage = new DonationPage(page);

    await donationPage.open();
    await donationPage.donate(userDonate);
    await donationPage.creditCardForm.checkError(expectedErrorMsg);
  });

  test("Test payment with invalid card double", async ({ page }) => {
    await allure.story("Test payment with invalid card double");

    const expectedErrorMsg: string = "declined";
    const userDonate: UserDonate = new UserDonate();
    const donationPage = new DonationPage(page);

    await donationPage.open();
    await donationPage.donate(userDonate);
    await donationPage.creditCardForm.checkError(expectedErrorMsg);
  });

  [
    { amount: "1", error: "The minimum" },
    { amount: "9999999999", error: "The maximum" },
  ].forEach(({ amount, error }) => {
    test(`Test wrong "${error}" amount`, async ({ page }) => {
      await allure.story(`Test payment with wrong amount: ${amount}`);
      const userDonate: UserDonate = new UserDonate();
      userDonate.amount = amount;
      const donationPage = new DonationPage(page);
      await donationPage.open();
      await donationPage.donationButton.click();
      await donationPage.paymentForm.fillPaymentForm(
        userDonate.amount,
        userDonate.currency,
        userDonate.monthly,
      );
      await donationPage.paymentForm.donateContinueButton.click(); // нажимаем на continue button еще раз
      await donationPage.paymentForm.checkAmountError(error); // проверям, что остались на прошлой странице + сообщение об ошибке
    });
  });
});
