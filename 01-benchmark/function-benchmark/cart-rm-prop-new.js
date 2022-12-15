import Product from "./../src/entities/product.js";

export default class Cart {
  constructor({ products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const result = [];

    for (const product of products) {
      const keys = Reflect.ownKeys(product);
      if (!keys.length) continue;

      // 1o modo de fazer - não performático
      // result.push(JSON.parse(JSON.stringfy(new Product(product))));

      // 2o modo de fazer - 109k ops/sec
      // keys.forEach((key) => product[key] || delete product[key]);

      // 3o modo de fazer - 104k ops/sec
      keys.forEach(
        (key) => product[key] || Reflect.deleteProperty(product, key)
      );

      // 4o modo de fazer - 108k ops/sec
      // let newObject = {};
      // keys.forEach((key) => {
      //   if (!keys[key]) return;

      //   newObject[key] = keys[key];
      // });

      result.push(new Product(product));
    }
    return result;
  }
}

// Reflect.deleteProperty(product, key) vai deletar o produto que não tiver chave valida
