import React from 'react';
import CheckoutProductsList from './CheckoutProductsList';
import CheckoutForm from './CheckoutForm';

class Checkout extends React.Component {
  render() {
    const { cartProducts } = this.props;
    return (
      <div>
        <CheckoutProductsList
          cartProducts={cartProducts}
        />
        <p>Checkout</p>
        <CheckoutForm />
      </div>
    );
  }
}

export default Checkout;
