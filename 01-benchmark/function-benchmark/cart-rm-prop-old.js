import Product from "./../src/entities/product.js";

export default class Cart {
  constructor({ products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const productsEntities = products
      .filter(
        (product) => !!Reflect.ownKeys(product).length
        // vai olhar o produto, se tiver chave valida dentro retorna senão ignora
      )
      .map((product) => new Product(product)); // vai retornar o novo produto

    return JSON.parse(JSON.stringify(productsEntities));
    // JSON.parse(JSON.stringify(productsEntities)) maneira muito errada de ser feita
  }
}
