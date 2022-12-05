import React from 'react'
import TodoList from './TodoList'
import Form from './Form'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      isHidden: false,
      idGenerator: 0,
      nameBuilder: "",
      todoList: [],
    }
  }

  componentDidMount(){
    axios.get(URL)
    .then(res => {this.setState({todoList: res.data.data})})
  }

  submitHandler = e => {
    e.preventDefault()
    axios.post(URL,{
      name: this.state.nameBuilder,
      completed: false
    }).then(res => {
    console.log(res.data.data)
    this.setState({todoList: [...this.state.todoList,res.data.data]})
  })}

  onInputChange = (e) => {
    this.setState({nameBuilder: e.target.value})
  }

  toDoItemClickHandler = (e) => {
    console.log(e.target)
    const selectedItem = 
    //filter to find 'completed' state based on id, change backend 'completed' based on front end filtering
    axios.patch(URL+`/${e.target.id}`,{completed: !e.target.completed})
  }

  toggleButtonClickHandler = () => {
    this.setState({isHidden: !this.state.isHidden})
    console.log(this.state.isHidden)
    console.log(this.state.todoList)
  }

  render() {
    return (
      <div>
        {/* filter list based on isHidden */}
        <TodoList todoList={this.state.isHidden ? this.state.todoList.filter(el => !el.completed) : this.state.todoList} itemClickHandler={this.toDoItemClickHandler}></TodoList>
        <Form
        isHidden={this.state.isHidden}
        toggleButtonClickHandler={this.toggleButtonClickHandler}
        submitHandler={this.submitHandler}
        inputChangeHandler={this.onInputChange}/>
      </div>
    )
  }
}
