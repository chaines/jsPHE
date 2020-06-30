import { dp } from "./dpTables.js";

export default function hash_quinary(q, k) {
  let sum = 0;
  const len = 13;
  for (let i = 0; i < len; i++) {
    sum += dp[q[i]][len - i - 1][k];

    k -= q[i];

    if (k <= 0) break;
  }
  return sum;
}
