import { createServer } from "http";
import { appendFile } from "fs/promises";

export function initializeServer() {
  async function handler(req, res) {
    await appendFile("./log.txt", `processed by ${process.pid}\n`);

    const result = Array.from({ length: 1e3 }, (_) =>
      Math.floor(Math.random() * 40)
    ).reduce((prev, next) => prev + next, 0);

    res.end(result.toString());
  }

  createServer(handler).listen(3000, () =>
    console.log(`Server running at 3000 and pid ${process.pid}`)
  );

  setTimeout(() => process.exit(1), Math.random() * 10000);
}
