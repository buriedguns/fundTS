class User {
  firstName: string = "Max";
  lastName: string = "Bakh";
  email: string = "blivion21@yandex.ru";
}

class Card {
  cardNumber: string = "4242 4242 4242 4242";
  expDate: string = "0428";
  cvc: string = "000";
}

export class UserDonate {
  user: User = new User();
  card: Card = new Card();
  monthly: boolean = true;
  amount: string = "100";
  currency: string = "USD";
  coverTransaction: boolean = false;
}
