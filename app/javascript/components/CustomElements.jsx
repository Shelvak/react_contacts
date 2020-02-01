import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

class LabelWithTextInput extends React.Component {
  render() {
    let id = `${this.props.object}_${this.props.attribute}`

    return (
      <div className="form-group required">
        <label htmlFor={id}>
          <abbr title="Required">*</abbr> {this.props.label}
        </label>
        <input className="form-control" type="text"
               name={this.props.attribute} id={id}
               value={this.props.value}
               required onChange={this.props.onChange} />
      </div>
    )
  }
}

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);

    this.confirm = this.confirm.bind(this)
  }

  confirm() {
    return window.confirm("Are you sure?") && this.props.destroyFn()
  }

  render() {
    return (
      <button onClick={this.confirm} className="btn btn-danger">
        {this.props.label || 'Delete'}
      </button>
    )
  }
}

class ShowLink extends React.Component {
  render() {
    return (
      <a title="Show" className="icon" href={this.props.href}>
        <FontAwesomeIcon icon={faSearch} />
      </a>
    )
  }
}

class EditLink extends React.Component {
  render() {
    return (
      <a title="Edit" className="icon" href={this.props.href}>
        <FontAwesomeIcon icon={faPen} />
      </a>
    )
  }
}

class DestroyLink extends React.Component {
  constructor(props) {
    super(props);

    this.confirm = this.confirm.bind(this)
  }

  confirm(event) {
    if (window.confirm("Are you sure?"))
      this.props.destroyFn()
    else
      event.preventDefault()
  }

  render() {
    return (
      <a title="Destroy" className="icon" href={this.props.href}
         onClick={this.confirm}>
        <FontAwesomeIcon icon={faTrash} />
      </a>
    )
  }
}

export {
  DeleteButton,
  LabelWithTextInput,
  ShowLink,
  EditLink,
  DestroyLink,
};
