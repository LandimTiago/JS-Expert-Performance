import { v4 } from "uuid";
import Product from "./product.js";

export default class Cart {
  constructor({ at, products }) {
    this.id = v4();
    // Durante as aulas o modulo randomUUID do pacote crypto foi mais rapido
    // entretanto com as atualizações dos pacotes do uuid o mesmo está mais rapido
    // que o crypto por isso foi mantido
    this.at = at;
    this.products = this.removeUndefinedProps(products);
    this.total = this.getCartPrice(products);
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

  getCartPrice() {
    return this.products
      .map((product) => product.price)
      .reduce((prev, next) => prev + next, 0);
  }
}
