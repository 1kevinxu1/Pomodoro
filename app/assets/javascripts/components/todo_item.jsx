TodoItem = React.createClass({
  getInitialState() {
    return {
        finished: this.props.todo["finished?"]
    }
  },

  handleChange(e) {
    e.preventDefault();
    var checked = e.target.checked;
    $.ajax('todos/' + this.props.todo.id, {
      data: {
        todo: {
          "finished?": checked
        }
      },
      success: function(data) {
        this.setState({finished: checked})
      }.bind(this),
      type: "PUT"
    });
  },

  handleDelete(e) {
    debugger;
    e.preventDefault();
    this.props.deleteItem(this.props.todo);
    var checked = e.target.checked;
    $.ajax('todos/' + this.props.todo.id, {
      type: "DELETE"
    });
  },

  render() {
    return (
      <div>
           <input type="checkbox" checked={this.state.finished} onChange={this.handleChange}/>
           <p onClick={this.props.handleClick}>{this.props.todo.title}</p>
           <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
      </div>
    )
  }
});
