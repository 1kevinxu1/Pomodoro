TodoForm = React.createClass({
  getInitialState () {
    return {
      title: ''
    }
  },

  handleChange(e) {
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  },

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.title === "") {
      alert("Title cannot be empty!");
    } else {
      var data = {todo: this.state};
      data.todo.pomodoros = 0;
      data.todo["finished?"] = false;
      $.post('/todos', data, function(data) {
        this.props.handleNewTodo(data);
        this.setState({title: ""});
        alert("New Todo Created!");
      }.bind(this));
    }
  },

  render () {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
          <input type="text" className="form-control new-todo" placeholder="Add new todo"
            name="title" value={this.state.title} onChange={this.handleChange}/>
      </form>
    )
  }
});
