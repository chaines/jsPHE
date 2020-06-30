import phe, { evaluateCardIds } from "../5cards.js";
import phe2 from "phe";
import Benchmark from "benchmark";

function* generateCombinations5(pool, start = 0, stop = 0) {
  const size = pool.length;
  let count = 0;
  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      for (let k = j + 1; k < size; k++) {
        for (let l = k + 1; l < size; l++) {
          for (let m = l + 1; m < size; m++) {
            count++;
            if (stop && count >= stop) return;
            if (count >= start)
              //yield hand;
              yield [pool[i], pool[j], pool[k], pool[l], pool[m]];
          }
        }
      }
    }
  }
}

const boardsToEval = [];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const suits = ["s", "c", "d", "h"];
const deck = [];
suits.forEach((suit) => {
  ranks.forEach((rank) => deck.push(phe.getId(rank + suit)));
});

for (const board of generateCombinations5(deck)) {
  boardsToEval.push(board);
}

boardsToEval.forEach((b) => phe.evaluateCardIds(b));
const suite = new Benchmark.Suite();
suite
  .add("Mine", () => {
    boardsToEval.forEach((b) => phe.evaluateCardIds(b));
  })
  .add("Theirs", () => {
    boardsToEval.forEach((b) => phe2.evaluateCardCodes(b));
  })
  .add("Mine with reference", () => {
    phe.evaluateCardIds(boardsToEval[0]);
  })
  .add("Mine without reference", () => {
    evaluateCardIds(boardsToEval[0]);
  })
  .on("cycle", (e) => console.log(String(e.target)))
  .run({ async: true });
