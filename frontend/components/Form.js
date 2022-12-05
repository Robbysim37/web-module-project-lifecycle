import React from 'react'

export default class Form extends React.Component {

  render() {
    return (
      <div>
      <form onSubmit={this.props.submitHandler}>
        <input type="text" onChange={this.props.inputChangeHandler}></input>
        <button>Add todo</button>
        <br></br>
        <button type="button" onClick={this.props.toggleButtonClickHandler}>
          {this.props.isHidden ? "Show completed": "Hide Completed"}
          </button>
      </form>
      </div>
    )
  }
}
