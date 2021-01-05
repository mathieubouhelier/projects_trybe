// implement Rating component here
import React from 'react';

class Rating extends React.Component {
  render() {
    const rating = this.props.rating;
    return (
      <div className="movie-card-rating">
        <span className="rating" >
          {rating}
        </span>
      </div>
    );
  }
}

export default Rating;
