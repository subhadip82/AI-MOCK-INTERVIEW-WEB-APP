import arcjet, { tokenBucket } from "@arcjet/next";

if (!process.env.ARCJET_KEY) {
  throw new Error("ARCJET_KEY is not defined");
}

export const aj = arcjet({
  key: process.env.ARCJET_KEY as string, // <-- your Arcjet API key
  rules: [
    tokenBucket({
      mode: "LIVE",              // actually enforce the rule
      characteristics: ["userId"], // each user tracked separately
      refillRate: 5,             // add 5 tokens per interval
      interval: 5,               // every 5ms = 5 milliseconds
      capacity: 10,               // max 10 tokens stored at once
    }),
  ],
});