import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import ProductList from './ProductList';
import Categories from './Categories';
import Header from './Header';
import ShoppingCart from './ShoppingCart';
import Checkout from './Checkout';
import ProductDetail from './ProductDetail';
import * as api from '../services/api';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      products: '',
      categories: '',
      selectedCategory: '',
      cartProducts: [],
      count: 0,
    };
    this.textChange = this.textChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onSelectedOptionChange = this.onSelectedOptionChange.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.removeProductToCart = this.removeProductToCart.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {
    api.getCategories().then((categories) => this.setState({ categories }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedCategory, searchText } = this.state;
    if (prevState.selectedCategory !== this.state.selectedCategory) {
      api
        .getProductsFromCategoryAndQuery(selectedCategory, searchText)
        .then((products) => this.setState({ products }));
    }
  }

  onSelectedOptionChange(event) {
    this.setState({ selectedCategory: event.target.value });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  textChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick() {
    api
      .getProductsFromCategoryAndQuery(
        this.state.selectedCategory,
        this.state.searchText,
      )
      .then((products) => this.setState({ products }));
  }

  removeProductToCart(product) {
    let flagRemove = false;
    this.state.cartProducts.map((cartProduct, index) => {
      if (cartProduct.id === product.id) {
        if (product.quantity > 1) {
          const cartProducts = [...this.state.cartProducts];
          const cartProduct1 = {
            ...cartProducts[index],
            quantity: cartProducts[index].quantity - 1,
          };
          cartProducts[index] = cartProduct1;
          this.setState({ cartProducts });
        } else {
          flagRemove = index;
        }
      }
      return 2;
    });
    if (flagRemove === true) {
      this.state.cartProducts.splice(flagRemove, 1);
    }
  }

  addProductToCart(product) {
    let flagExist = false;
    this.state.cartProducts.map((cartProduct, index) => {
      const stockOk = cartProduct.selectedProduct.sold_quantity === cartProduct.quantity;
      // console.log("stockOk", stockOk);
      if (cartProduct.id === product.id && stockOk) {
        flagExist = true;
      }
      if (cartProduct.id === product.id) {
        flagExist = true;
        const cartProducts = [...this.state.cartProducts];
        const cartProduct1 = {
          ...cartProducts[index],
          quantity: cartProducts[index].quantity + 1,
        };
        cartProducts[index] = cartProduct1;
        this.setState({ cartProducts });
      }
      return flagExist;
    });
    if (flagExist === false) {
      const newProduct = {
        id: product.id,
        quantity: 1,
        selectedProduct: product,
      };
      this.setState((state) => {
        const cartProducts = [...state.cartProducts, newProduct];
        return { cartProducts };
      });
    }
  }

  renderCart() {
    const { cartProducts, count } = this.state;
    const { ...props } = this.props;

    return (
      <ShoppingCart
        {...props}
        cartProducts={cartProducts}
        count={count}
        onClickAdd={this.addProductToCart}
        onClickRemove={this.removeProductToCart}
        onclickIncrement={this.increment}
        onclickDecrement={this.decrement}
      />
    );
  }

  renderMainContent() {
    const { selectedCategory, products, categories, searchText } = this.state;

    return (
      <div>
        <SearchBar
          searchText={searchText}
          textChange={this.textChange}
          onClickSearch={this.handleClick}
        />
        <ProductList
          products={products}
          onClickAdd={this.addProductToCart}
          onclickIncrement={this.increment}
        />
        <Categories
          selectedCategory={selectedCategory}
          categories={categories}
          onChangeOption={this.onSelectedOptionChange}
        />
      </div>
    );
  }

  render() {
    const { products, cartProducts, count } = this.state;
    return (
      <Router>
        <div className="App">
          <Header count={count} />
          <Switch>
            <Route
              path="/ShoppingCart" render={(props) => this.renderCart(props)}
            />
            <Route
              path="/checkout"
              render={(props) => (<Checkout {...props} cartProducts={cartProducts} />)}
            />
            <Route
              exact path="/:id" render={(props) => (
                <ProductDetail
                  id={props.match.params.id} product={props.location.test.product}
                  products={products}
                  onClickAdd={this.addProductToCart}
                  onclickIncrement={this.increment}
                />
              )}
            />
            <Route
              exact path="/" render={(props) => this.renderMainContent(props)}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default MainPage;
