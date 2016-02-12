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
    var data = {todo: this.state};
    // New todo items always start at 0 pomodoros
    data.todo.pomodoros = 0;
    data.todo["finished?"] = false;
    $.post('', data, function(data) {
      this.props.handleNewTodo(data);
      this.setState({title: ""});
      alert("New Todo!");
    }.bind(this));
  },

  validInputs() {
    return this.state.title !== "";
  },

  render () {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="Name"
            name="title" value={this.state.title} onChange={this.handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.validInputs()}>Create Todo!</button>
      </form>
    )
  }
});
