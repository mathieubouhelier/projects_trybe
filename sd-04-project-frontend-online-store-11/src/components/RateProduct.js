import { Component } from 'react';
import React from 'react';
import ReactStars from 'react-stars';
import './RateProduct.css';

class RateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textEmail: '',
      rating: 0,
      textArea: '',
    };
  }

  render() {
    const { textEmail, textArea, rating } = this.state;
    return (
      <section className="rate-section">
        <h3 className="rate-title">Avaliações</h3>
        <form className="rate-form">
          <div className="frst-line">
            <input
              className="rate-email" name="email" data-testid="product-detail-evaluation"
              type="email" placeholder="Email" defaultValue={textEmail}
            />
            <ReactStars
              className="react-stars" count={5} size={28}
              color={'#ffd700'} defaultValue={rating}
            />
          </div>
          <div className="sec-line">
            <textarea
              className="rate-area" type="text"
              placeholder="Mensagem(opcional)" defaultValue={textArea}
            />
            <button className="rate-button">Avaliar</button>
          </div>
        </form>
      </section>
    );
  }
}

export default RateProduct;
