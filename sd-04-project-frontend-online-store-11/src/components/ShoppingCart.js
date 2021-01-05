import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: [],
      count: 0,
    };
    this.addProductToCart = this.addProductToCart.bind(this);
    this.removeProductToCart = this.removeProductToCart.bind(this);
    this.cartRender = this.cartRender.bind(this);
  }

  addProductToCart(product) {
    this.props.onClickAdd(product);
    this.props.onclickIncrement();
  }

  removeProductToCart(product) {
    this.props.onClickRemove(product);
    this.props.onclickDecrement();
  }

  cartRender() {
    const { cartProducts } = this.props;

    return (
      <div>
        {cartProducts.map((product) => (
          <div data-testid="shopping-cart-product-name" key={product.id}>
            <p>{product.id}</p>
            <p>{product.selectedProduct.title}</p>
            <img src={product.selectedProduct.thumbnail} alt={product.title} />
            <div>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={() => this.addProductToCart(product)}
              >
                +
              </button>
              <p data-testid="shopping-cart-product-quantity">{product.quantity}</p>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={() => this.removeProductToCart(product)}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    if (this.props.count === 0) {
      return (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      );
    }
    return (
      <div>
        <Link data-testid="checkout-products" to="/checkout">
          <button type="button">Checkout</button>
        </Link>
        <this.cartRender />
      </div>
    );
  }
}

export default ShoppingCart;
