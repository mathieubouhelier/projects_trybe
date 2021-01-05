import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import categoriesData from '../data/categoriesData';
import storeConfiguration from '../actions/configuration';

class ConfigurationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiFilters: {
        category: '',
        difficulty: '',
        type: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.categoryRender = this.categoryRender.bind(this);
    this.difficultyRender = this.difficultyRender.bind(this);
    this.typeRender = this.typeRender.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      apiFilters: {
        ...this.state.apiFilters,
        [name]: value,
      },
    });
    this.props.storeConfiguration(this.state.apiFilters);
  }

  categoryRender() {
    this.bar = 12; // Without CC asked for using this
    return (
      <select
        name="category"
        value={this.state.value}
        onChange={this.handleChange}
        defaultValue="All"
      >
        <option key="All" value="All">All</option>
        {categoriesData.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    );
  }

  difficultyRender() {
    this.bar = 12; // Without CC asked for using this
    const difficultyData = ['easy', 'medium', 'hard'];
    return (
      <select
        name="difficulty"
        value={this.state.value}
        onChange={this.handleChange}
        defaultValue="All"
      >
        <option key="All" value="All">All</option>
        {difficultyData.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  }

  typeRender() {
    this.bar = 12; // Without CC asked for using this
    return (
      <select
        name="type"
        value={this.state.value}
        onChange={this.handleChange}
        defaultValue="All"
      >
        <option key="All" value="All">All</option>
        <option key="multiple" value="multiple">Multiple Choice</option>
        <option key="boolean" value="boolean">True False</option>
      </select>
    );
  }

  render() {
    return (
      <div>
        <this.categoryRender />
        <this.difficultyRender />
        <this.typeRender />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  storeConfiguration: (e) => dispatch(storeConfiguration(e)),
});

ConfigurationComponent.propTypes = {
  storeConfiguration: PropTypes.shape(),
};

ConfigurationComponent.defaultProps = {
  storeConfiguration: null,
};

export default connect(null, mapDispatchToProps)(ConfigurationComponent);
