import React from 'react';
import { connect } from 'react-redux'

const TodoList = (props) => {
  let todos = 'hello';
  
  if(props.todos) {
    todos = props.todos.map((todo, index) => {
      console.log(todo)
      return <div key={index}>{todo}</div>
    }); 
  }
  
  return <div style={{display: 'inline-block'}}>{todos}</div>
  
}

const mapStateToProps = (state) => ({
  todos: state.todos.present  
})

export default connect(mapStateToProps)(TodoList)

