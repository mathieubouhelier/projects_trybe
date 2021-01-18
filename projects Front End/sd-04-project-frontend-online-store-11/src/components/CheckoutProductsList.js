import React from 'react';

class CheckoutProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: [{ selectedProduct: { installments: { amount: 0 } } }],
      // totalPrice: 0,
    };
    this.totalPriceSum = this.totalPriceSum.bind(this);
  }

  totalPriceSum() {
    let totalPrice = 0;
    const { cartProducts } = this.props;
    if (cartProducts.length > 0) {
      // console.log('inside totalprice cartProducts', cartProducts);
      cartProducts.map((product) => {
        totalPrice += product.selectedProduct.price * product.quantity;
        return totalPrice;
      });
    }
    return totalPrice;
  }

  render() {
    const { cartProducts } = this.props;
    this.totalPriceSum();
    // let count = 0;
    return (
      <div>
        <p>Checkout Here!</p>
        {cartProducts.map(
          (product) => (
            // (count = count + 1),
            // console.log('count', count),
            (
              <div key={product.id}>
                <img
                  src={product.selectedProduct.thumbnail}
                  alt={product.title}
                />
                <p>
                  {product.selectedProduct.title} quantity: {product.quantity}{' '}
                  Price: {product.selectedProduct.price}{' '}
                  {product.selectedProduct.currency_id}
                </p>
              </div>
            )
          ),
        )}
        <h3>Total: {this.totalPriceSum()}</h3>
      </div>
    );
  }
}

export default CheckoutProductsList;
