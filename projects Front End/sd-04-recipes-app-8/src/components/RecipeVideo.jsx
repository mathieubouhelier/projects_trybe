import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const RecipeVideo = ({ recipe }) => (
  <div>
    <h3>Video</h3>
    <embed
      data-testid="video"
      src={recipe[0].strYoutube.replace('watch?v=', 'embed/')}
      width="250"
      height="200"
    />
  </div>
);

const mapStateToProps = (state) => ({
  recipe: state.DetailReducer.id,
});

RecipeVideo.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, null)(RecipeVideo);
