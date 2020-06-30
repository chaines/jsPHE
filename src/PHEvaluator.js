import Hand from "./Hand.js";
import Card from "./Card.js";
import { binariesById, suitbitById } from "./Constants.js";
import evaluate5 from "./evaluate5.js";
//import noflush5 from "./noFlushTable5.js";
import noflush6 from "./noFlushTable6.js";
import noflush7 from "./noFlushTable7.js";
import hash from "./hash.js";
import { suits } from "./dpTables.js";

const PHEvaluator = {};

function evaluate6([a, b, c, d, e, f]) {
  let suitHash = 0;
  suitHash += suitbitById[a];
  suitHash += suitbitById[b];
  suitHash += suitbitById[c];
  suitHash += suitbitById[d];
  suitHash += suitbitById[e];
  suitHash += suitbitById[f];
  if (suits[suitHash]) {
    const suitBinary = new Uint32Array(4);
    suitBinary[a & 0x3] |= binariesById[a];
    suitBinary[b & 0x3] |= binariesById[b];
    suitBinary[c & 0x3] |= binariesById[c];
    suitBinary[d & 0x3] |= binariesById[d];
    suitBinary[e & 0x3] |= binariesById[e];
    suitBinary[f & 0x3] |= binariesById[f];
    return flush[suitBinary[suits[suitHash] - 1]];
  }

  const quinary = new Uint8Array(13);
  quinary[a >> 2]++;
  quinary[b >> 2]++;
  quinary[c >> 2]++;
  quinary[d >> 2]++;
  quinary[e >> 2]++;
  quinary[f >> 2]++;

  const hashed = hash(quinary, 6);
  return noflush6[hashed];
}

function evaluate7([a, b, c, d, e, f, g]) {
  let suitHash = 0;
  suitHash += suitbitById[a];
  suitHash += suitbitById[b];
  suitHash += suitbitById[c];
  suitHash += suitbitById[d];
  suitHash += suitbitById[e];
  suitHash += suitbitById[f];
  suitHash += suitbitById[g];
  if (suits[suitHash]) {
    const suitBinary = new Uint32Array(4);
    suitBinary[a & 0x3] |= binariesById[a];
    suitBinary[b & 0x3] |= binariesById[b];
    suitBinary[c & 0x3] |= binariesById[c];
    suitBinary[d & 0x3] |= binariesById[d];
    suitBinary[e & 0x3] |= binariesById[e];
    suitBinary[f & 0x3] |= binariesById[f];
    suitBinary[g & 0x3] |= binariesById[g];
    return flush[suitBinary[suits[suitHash] - 1]];
  }

  const quinary = new Uint8Array(13);
  quinary[a >> 2]++;
  quinary[b >> 2]++;
  quinary[c >> 2]++;
  quinary[d >> 2]++;
  quinary[e >> 2]++;
  quinary[f >> 2]++;
  quinary[g >> 2]++;

  const hashed = hash(quinary, 7);
  return noflush7[hashed];
}

export function evaluateCards(cards) {
  if (cards.length < 5 && cards.length > 7)
    throw new RangeError(
      cards.length + " is not a valid number of cards to evaluate"
    );
  if (cards[0] instanceof Card) return evaluateHand(new Hand(cards));
  switch (cards.length) {
    case 5:
      return evaluate5(cards[0], cards[1], cards[2], cards[3], cards[4]);
    case 6:
      return evaluate6(cards);
    case 7:
      return evaluate7(cards);
  }
}

export function evaluateHand(hand) {
  if (suits[hand.suitHash])
    return flush[hand.suitBinary[suits[hand.suitHash] - 1]];

  const hashedVal = hash(hand.quinary, hand.size);

  switch (hand.size) {
    case 5:
      return noflush5[hashedVal];
    case 6:
      return noflush6[hashedVal];
    case 7:
      return noflush7[hashedVal];
    default:
      return noflush5[hashedVal];
  }
}

PHEvaluator.evaluateCards = evaluateCards;
PHEvaluator.evaluateHand = evaluateHand;

export default PHEvaluator;
