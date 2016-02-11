Todos = React.createClass({
  getInitialState() {
    return {
      todos: this.props.data
    }
  },

  getDefaultProps() {
    return {
      todos: []
    }
  },

  newTodo(todoItem) {
    var todos = this.state.todos.slice();
    todos.push(todoItem);
    this.setState({todos: todos});
  },

  render() {
    return (
      <div className="records">
        <h2 className="title"> Todos </h2>
        {this.state.todos.map((function(todo) {
          return <TodoItem todo={todo} key={todo.id}></TodoItem>
        }))}
        <TodoForm handleNewTodo={this.newTodo}></TodoForm>
      </div>
    )
  }
});

TodoItem = React.createClass({
  render() {
    var todo = this.props.todo;
    return (
      <div>
           {todo.title}
           {todo.pomodoros}
      </div>
    )
  }
});
