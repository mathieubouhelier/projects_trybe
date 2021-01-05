import React from 'react';

class Form extends React.Component {
  render() {
    const { htmlForValue, title, typeValue, nameValue, valueValue } = this.props.form;
    return (
      <label htmlFor={htmlForValue}>
        {title}
        <input
          type={typeValue}
          name={nameValue}
          value={valueValue}
          onChange={(e) => this.handleChange(e, { nameValue })}
        />
      </label>

    );
  }
}

export default Form;
