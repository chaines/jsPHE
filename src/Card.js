export default class Card {
  constructor(card) {
    if (card && card.isNaN()) {
      this.#id =
        Card.#ranks.indexOf(card[0]) * 4 + Card.#suits.indexOf(card[1]);
    } else if (!card.isNaN()) {
      this.#id = card;
    }
  }
  valueOf() {
    return this.#id;
  }

  #id;
  static #ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
    "A",
  ];
  static #suits = ["c", "d", "h", "s"];
}
