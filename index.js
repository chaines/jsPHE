import phe from "./src/PHEvaluator.js";
import Hand from "./src/Hand.js";

export function getId(card) {
  return rankVals[card[0]] + suitVals[card[1]];
}

export function getIds(cards) {
  const cardVals = [];
  const l = cards.length;
  for (let i = 0; i < l; i++) {
    cardVals.push(rankVals[cards[i][0]] + suitVals[cards[i][1]]);
  }
  return cardVals;
}

export function getIdsFaster(cards) {
  cards.map((c) => rankVals[c[0]] | suitVals[c[1]]);
}

export function evaluateCardIds(cards) {
  return phe.evaluateCards(cards);
}

export function evaluateCards(cards) {
  const ids = getIds(cards);
  return phe.evaluateCards(ids);
}

const rankVals = {
  2: 0b000000,
  3: 0b000100,
  4: 0b001000,
  5: 0b001100,
  6: 0b010000,
  7: 0b010100,
  8: 0b011000,
  9: 0b011100,
  T: 0b100000,
  J: 0b100100,
  Q: 0b101000,
  K: 0b101100,
  A: 0b110000,
};

const suitVals = {
  s: 0b00,
  h: 0b01,
  d: 0b10,
  c: 0b11,
};

export default { evaluateCardIds, evaluateCards, getIds, Hand, getId };
