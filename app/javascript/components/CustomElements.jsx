import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPen, faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons'

class LabelWithTextInput extends React.Component {
  render() {
    const id   = `${this.props.object}_${this.props.attribute}`
    const type = this.props.type || 'text'

    return (
      <div className="form-group required">
        <label htmlFor={id}>
          <abbr title="Required">*</abbr> {this.props.label}
        </label>
        <input className="form-control" type={type}
               name={this.props.attribute} id={id}
               value={this.props.value}
               required onChange={this.props.onChange} />
        {this.props.showError && this.props.showError(this.props.attribute)}
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
      <Link title="Show" className="icon" to={this.props.href}>
        <FontAwesomeIcon icon={faSearch} />
      </Link>
    )
  }
}

class EditLink extends React.Component {
  render() {
    return (
      <Link title="Edit" className="icon" to={this.props.href}>
        <FontAwesomeIcon icon={faPen} />
      </Link>
    )
  }
}

class DestroyLink extends React.Component {
  constructor(props) {
    super(props);

    this.confirm = this.confirm.bind(this)
  }

  confirm(event) {
    if (!window.confirm("Are you sure?"))
      event.preventDefault()
  }

  render() {
    return (
      <Link title="Destroy" className="icon" to={this.props.href}
         onClick={this.confirm}>
        <FontAwesomeIcon icon={faTrash} />
      </Link>
    )
  }
}

class SearchLink extends React.Component {
  render() {
    const classes = `${this.props.className} icon`

    return (
      <Link title="Search" className={classes} to="#"
         onClick={this.props.handleClick}>
        <FontAwesomeIcon icon={faSearch} />
      </Link>
    )
  }
}

class SignOutLink extends React.Component {
  confirm = (event) => {
    if (window.confirm("Are you sure?"))
      this.props.signOut(this.props.history);
    else
      event.preventDefault()
  }

  render() {
    return (
      <a title="SignOut" className="icon text-white" href="#"
         onClick={this.confirm}>
        <FontAwesomeIcon icon={faArrowRight} size="lg"/>
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
  SearchLink,
  SignOutLink,
};
