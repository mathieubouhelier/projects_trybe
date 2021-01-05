import React from 'react';
import { Link } from 'react-router-dom';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.clickToAdd = this.clickToAdd.bind(this);
  }

  clickToAdd(product) {
    this.props.onClickAdd(product);
    this.props.onclickIncrement();
  }

  render() {
    const { products } = this.props;
    if (products === '') return 'Carregando Produto liste...';
    return (
      <div>
        <h1>ProductList</h1>
        {products.results.map((product) => (
          <div data-testid="product" key={product.id}>
            <p>{product.id}</p>
            <p>{product.title}</p>
            {product.shipping.free_shipping && (
              <p data-testid="free-shipping">{product.shipping.free_shipping}</p>
            )}
            <img src={product.thumbnail} alt={product.title} />
            <button
              type="button" data-testid="product-add-to-cart"
              onClick={() => this.clickToAdd(product)}
            >
              Add this item to Cart
            </button>
            <Link
              data-testid="product-detail-link"
              to={{ pathname: `./${product.id}`, test: { product } }}
            >
              Detalhe
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductList;
