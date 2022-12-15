import { createServer } from "http";
import { randomBytes } from "crypto";
import Events from "events";

const myEvent = new Events();

function getBytes() {
  return randomBytes(10000);
}

function onData() {
  getBytes();
  const itens = [];
  setInterval(function myInterval() {
    itens.push(Date.now());
  });
}

myEvent.on("data", onData);
createServer(function handler(req, res) {
  myEvent.emit("data", Date.now());

  res.end("ok");
}).listen(3000, () => console.log("running at 3000"));
