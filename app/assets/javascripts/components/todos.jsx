Todos = React.createClass({
  getInitialState() {
    return {
      todos: this.props.data,
      selectedTodo: this.props.data[0] || null
    }
  },

  getDefaultProps() {
    return {
      todos: []
    }
  },

  deleteItem(todo) {
    var todos = this.state.todos.slice();
    var index = todos.indexOf(todo);
    todos.splice(index, 1);
    var newState = {};
    newState["todos"] = todos;
    if (this.state.selectedTodo === todo) {
      newState["selectedTodo"] = null;
    }
    this.setState(newState);
  },

  updateItem(oldTodo, newProps) {
    var todos = this.state.todos.slice();
    var index = todos.indexOf(oldTodo);
    var oldTodo = todos[index]
    todos[index] = $.extend({}, oldTodo, newProps);
    var newState = {};
    newState["todos"] = todos;
    if (this.state.selectedTodo === oldTodo) {
      newState["selectedTodo"] = todos[index];
    }
    this.setState(newState);
  },

  newTodo(todoItem) {
    var todos = this.state.todos.slice();
    todos.push(todoItem);
    this.setState({todos: todos});
  },

  selectTodo(todoItem) {
    this.setState({selectedTodo: todoItem});
  },

  render() {
    var key = this.state.selectedTodo ? this.state.selectedTodo.id : ""
    return (
      <div className="records">
        <h2 className="title"> Pomodoro TodoList! </h2>
        <div className="col-xs-6">
          <div className="todo-section">
            <PomodoroTimer todo={this.state.selectedTodo} key={key} updateItem={this.updateItem}/>
          </div>
        </div>
        <div className="col-xs-6 col-xs-6-offset">
          <div className="todo-section">
            <TodoForm handleNewTodo={this.newTodo}></TodoForm>
            {this.state.todos.map(function(todo) {
              return <TodoItem todo={todo} key={todo.id}
                               deleteItem={this.deleteItem}
                               updateItem={this.updateItem}
                               handleClick={this.selectTodo.bind(this, todo)}>
                     </TodoItem>
            }, this)}
          </div>
        </div>
      </div>
    )
  }
});
