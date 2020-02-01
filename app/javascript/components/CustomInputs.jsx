import React from "react";

class LabelWithTextInput extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let id = `${this.props.object}_${this.props.attribute}`

    return (
      <div className="form-group required">
        <label htmlFor={id}>
          <abbr title="Required">*</abbr>{this.props.label}
        </label>
        <input className="form-control" type="text"
               name={this.props.attribute} id={id}
               value={this.props.value}
               required onChange={this.props.onChange} />
      </div>
    )
  }
}

export default LabelWithTextInput;
