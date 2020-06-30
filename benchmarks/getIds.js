import { getIds, getIdsFaster } from "../index.js";
import phe from "phe";
import Benchmark from "benchmark";

const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const suits = ["s", "c", "d", "h"];
const deck = [];
suits.forEach((suit) => {
  ranks.forEach((rank) => deck.push(rank + suit));
});

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
for (const board of generateCombinations5(deck)) {
  boardsToEval.push(board);
}

const boardCodes = [];
const suite = new Benchmark.Suite();
suite
  .add("Test", () => {
    getIds(boardsToEval[0]);
  })
  .add("Faster", () => {
    getIdsFaster(boardsToEval[0]);
  })
  .add("phe", () => {
    phe.cardCodes(boardsToEval[0]);
  })
  .on("cycle", (e) => console.log(String(e.target)))
  .run({ async: true });
