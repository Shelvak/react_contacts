import React from "react";

function showErrorMsgFor(attr) {
  const errors = this.state.errors;

  if (!errors[attr])
    return

  return (
    <span className="text-danger">
      { errors[attr] }
    </span>
  )
};

function setStateOnChange(event) {
  this.setState({ [event.target.name]: event.target.value })
};

function updateErrors(errors) {
  if (!errors || errors == {}) {
    this.setState({ errors: { base: 'Oops, something wrong' } })
    return
  }

  this.setState({ errors: errors })
};

export {
  showErrorMsgFor,
  setStateOnChange,
  updateErrors,
};
