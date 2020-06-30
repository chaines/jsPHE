import Benchmark from "benchmark";

const x = 0b001100;
const y = 0b000011;

const suite = new Benchmark.Suite();

suite
  .add("Addition (+)", () => {
    const z = x + y;
  })
  .add("Bitwise or (|)", () => {
    const z = x | y;
  })
  .on("cycle", (e) => console.log(String(e.target)))
  .run({ async: true });
