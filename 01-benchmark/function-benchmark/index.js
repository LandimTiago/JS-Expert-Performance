import Benchmark from "benchmark";

import databaseEmpty from "../databaseEmpty.js";
import database from "../database.js";

import CartOld from "./cart-id-old.js";
import CartNew from "./cart-id-new.js";

import CartRmOld from "./cart-rm-prop-old.js";
import CartRmNew from "./cart-rm-prop-new.js";
import CartPriceOld from "./cart-price-old.js";
import CartPriceNew from "./cart-price-new.js";

const suite = new Benchmark.Suite();

// Comparativos de geradores de uuid entre o pacote 'uuid' e o pacote 'crypto
// Cart#cartIdUUID x 5,727,230 ops/sec ±0.82% (90 runs sampled)
// Cart#cartIdCrypto x 5,760,407 ops/sec ±0.62% (92 runs sampled)
// Fastest is Cart#cartIdCrypto,Cart#cartIdUUID
// suite
//   .add("Cart#cartIdUUID", function () {
//     new CartOld();
//   })
//   .add("Cart#cartIdCrypto", function () {
//     new CartNew();
//   })
//   .on("cycle", (event) => console.log(String(event.target)))
//   .on("complete", function () {
//     console.log(`Fastest is ${this.filter("fastest").map("name")}`);
//   })
//   .run();

// comparativo de geradores de carrinhos com for e com filter/map
// Cart#RmEmptyPropsOld x 41,222 ops/sec ±0.23% (94 runs sampled)
// Cart#RmEmptyPropsNew x 108,222 ops/sec ±0.38% (96 runs sampled)
// Fastest is Cart#RmEmptyPropsNew
// suite
//   .add("Cart#RmEmptyPropsOld", function () {
//     new CartRmOld(databaseEmpty);
//   })
//   .add("Cart#RmEmptyPropsNew", function () {
//     new CartRmNew(databaseEmpty);
//   })
//   .on("cycle", (event) => console.log(String(event.target)))
//   .on("complete", function () {
//     console.log(`Fastest is ${this.filter("fastest").map("name")}`);
//   })
//   .run({ async: true });

// comparativo de calculo de valor total de cada carrinho
// Cart#PriceOld-MapReduce x 228,847 ops/sec ±12.87% (91 runs sampled)
// Cart#PriceNew-For x 882,155 ops/sec ±2.15% (92 runs sampled)
// Fastest is Cart#PriceNew-For
suite
  .add("Cart#PriceOld-MapReduce", function () {
    new CartPriceOld(database);
  })
  .add("Cart#PriceNew-For", function () {
    new CartPriceNew(database);
  })
  .on("cycle", (event) => console.log(String(event.target)))
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });
