import React, { Component } from 'react';
import RateProduct from './RateProduct';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  addProductToCart(product) {
    this.props.onClickAdd(product);
    this.props.onclickIncrement();
  }

  render() {
    if (this.props.products.length === 0) {
      return <p>No Details</p>;
    }
    const { title, price, thumbnail, attributes } = this.props.product;
    return (
      <section>
        <div>
          <p>detail</p>
          <h1 data-testid="product-detail-name">
            {title} - R${price}
          </h1>
          <img src={thumbnail} alt={title} />
        </div>
        <div>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={() => this.addProductToCart(this.props.product)}
          >
            Add this item to Cart
          </button>
        </div>
        <div>
          <h3>Especificações Técnicas</h3>
          <p>{attributes[0].value_name}</p>
          <p>{attributes[1].value_name}</p>
        </div>
        <RateProduct />
      </section>
    );
  }
}

export default ProductDetail;
