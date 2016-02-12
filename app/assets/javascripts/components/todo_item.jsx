TodoItem = React.createClass({
  getInitialState() {
    return {
        finished: this.props.todo["finished?"],
        editing: false
    }
  },

  toggleFinished(e) {
    e.preventDefault();
    var todo = {}
    var checked = e.target.checked;
    todo["finished?"] = checked;
    var newState = {finished: checked}
    this.updateTodo(todo, newState);
  },

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteItem(this.props.todo);
    var checked = e.target.checked;
    $.ajax('todos/' + this.props.todo.id, {
      type: "DELETE"
    });
  },

  handleEdit(editingState) {
    this.setState({editing: editingState});
  },

  handleSubmit(e) {
    e.preventDefault();
    var todo = {}
    todo["title"] = $('#new-title').val();
    var newState = {editing: false}
    this.updateTodo(todo, newState);
  },

  updateTodo(newTodo, newState) {
    debugger;
    $.ajax('todos/' + this.props.todo.id, {
      data: {
        todo: newTodo
      },
      success: function(data) {
        debugger;
        this.props.updateItem(this.props.todo, newTodo);
        this.setState(newState)
      }.bind(this),
      type: "PUT"
    });
  },

  render() {
    if (this.state.editing) {
      return (
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <input id="new-title" type="text" className="form-control" placeholder="Rename to..."/>
          <button className="btn btn-danger todo-item-button" onClick={this.handleEdit.bind(this, false)}>Cancel</button>
        </form>
      )
    } else {
      return (
        <div className="todo-list-item">
          <input type="checkbox" className="completed-checkbox" checked={this.state.finished} onChange={this.toggleFinished}/>
          <h4 className="todo-item-title" onClick={this.props.handleClick}>{this.props.todo.title}</h4>
          <button className="btn btn-danger todo-item-button" onClick={this.handleDelete}>Delete</button>
          <button className="btn btn-primary todo-item-button" onClick={this.handleEdit.bind(this, true)}>Edit</button>
        </div>
      )
    }
  }
});
