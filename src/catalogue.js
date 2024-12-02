export class Catalogue {
  constructor(title) {
    this.title = title;
    this.products = [];
  }

  findProductById(id) {
    const match = this.products.find((product) => id === product.id);
    return match;
  }

  addProduct(product) {
    if (!this.findProductById(product.id) && product.name && product.price) {
      this.products.push(product);
      return true;
    }
    return false;
  }
  
  removeProductById(id) {
    const removedProduct = this.findProductById(id);
    if (removedProduct) {
      this.products = this.products.filter(
        (product) => product.id !== id 
      );
    }
    return removedProduct;
  }
  
  checkReorders() {
    const result = { type: "Reorder", productIds: [] };
    this.products.forEach( (p) => {
      if (p.quantityInStock <= p.reorderLevel) {
        result.productIds.push(p.id);
      }
    });
    return result;
  }

  batchAddProducts(batch) {
    const validAdditions = batch.products.filter(
      (product) => product.quantityInStock > 0
    )
    validAdditions.forEach((p) => this.addProduct(p) );
    return validAdditions.length;
  }
}

