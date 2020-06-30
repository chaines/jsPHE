import Card from "./Card.js";
import { binariesById, suitbitById } from "./Constants.js";

export default class Hand {
  constructor(card) {
    if (card instanceof Card) {
      this.addCard(card);
    } else {
      for (const c of card) {
        this.addCard(c);
      }
    }
  }

  concat(card) {
    return new Hand(this).addCard(card);
  }
  addCard(card) {
    this.#suitHash += suitbitById[card];
    this.#suitBinary[card & 0x3] |= binariesById[card];
    this.#quinary[card >> 2]++;
    this.#size++;
    return this;
  }
  removeCard(card) {
    this.#suitHash ^= suitbitById[card];
    this.#suitBinary[card & 0x3] ^= binariesByid[card];
    this.#quinary[card >> 2]--;
    this.#size--;
    return this;
  }

  get size() {
    return this.#size;
  }

  get suitHash() {
    return this.#suitHash;
  }

  get suitBinary() {
    return this.#suitBinary;
  }

  get quinary() {
    return this.#quinary;
  }

  #size = 0;
  #suitHash = 0;
  #suitBinary = new Uint32Array(4);
  #quinary = new Uint8Array(13);
}
