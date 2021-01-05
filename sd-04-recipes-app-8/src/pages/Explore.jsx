import React from 'react';
import { Link } from 'react-router-dom';

import ExploreHeader from '../components/ExploreHeader';
import Footer from '../components/Footer';

const Explore = () => (
  <div>
    <ExploreHeader title={'Explorar'} />
    <div className="row justify-content-around mt-2">
      <Link to="/explorar/comidas">
        <button type="button" data-testid="explore-food" className="btn btn-info">
          Explorar Comidas
      </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button type="button" data-testid="explore-drinks" className="btn btn-info">
          Explorar Bebidas
      </button>
      </Link>
    </div>
    <Footer />
  </div>
);

export default Explore;
