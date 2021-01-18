import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.nameFormRender = this.nameFormRender.bind(this);
    this.phoneFormRender = this.phoneFormRender.bind(this);
    this.CEPFormRender = this.CEPFormRender.bind(this);
    this.adressFormRender = this.adressFormRender.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  // }

  nameFormRender() {
    return (
      <label htmlFor="name">
        Name :
        <input
          name="name"
          data-testid="checkout-fullname"
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />
      </label>
    );
  }

  phoneFormRender() {
    return (
      <label htmlFor="phone">
        Phone :
        <input
          name="phone"
          data-testid="checkout-phone"
          type="text"
          value={this.state.phone}
          onChange={this.handleChange}
        />
      </label>
    );
  }

  CEPFormRender() {
    return (
      <label htmlFor="cep">
        CEP :
        <input
          name="CEP"
          data-testid="checkout-cep"
          type="text"
          value={this.state.CEP}
          onChange={this.handleChange}
        />
      </label>
    );
  }

  adressFormRender() {
    return (
      <label htmlFor="adress">
        Adress :
        <textarea
          name="adress"
          data-testid="checkout-address"
          type="text area"
          value={this.state.adress}
          onChange={this.handleChange}
        />
      </label>
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <this.nameFormRender />

        <label htmlFor="email">
          Email :
          <input
            name="email"
            data-testid="checkout-email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="cpf">
          CPF :
          <input
            name="cpf"
            data-testid="checkout-cpf"
            type="text"
            value={this.state.cpf}
            onChange={this.handleChange}
          />
        </label>
        <this.phoneFormRender />
        <this.CEPFormRender />
        <this.adressFormRender />
        <input type="submit" value="Send" />
      </form>
    );
  }
}

export default CheckoutForm;
