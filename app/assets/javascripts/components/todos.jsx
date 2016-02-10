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

  render() {
    return (
      <div className="records">
        <h2 className="title"> Todos </h2>
        {this.state.todos.map((function(todo) {
          return <TodoItem todo={todo} key={todo.id}></TodoItem>
        }))}
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
