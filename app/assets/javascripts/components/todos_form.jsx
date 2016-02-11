TodoForm = React.createClass({
  getInitialState () {
    return {
      title: '',
      pomodoros: ''
    }
  },

  handleChange(e) {
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  },

  handleSubmit(e) {
    e.preventDefault();
    $.post('', {todo: this.state}, function(data) {
      this.props.handleNewTodo(data);
      this.setState({title: "", pomodoros: ""});
      alert("New Todo!");
    }.bind(this));
  },

  validInputs() {
    return this.state.title !== "" && Number.isInteger(parseInt(this.state.pomodoros));
  },

  render () {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="Name"
            name="title" value={this.state.title} onChange={this.handleChange}/>
        </div>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="Estimated Pomodoros"
             name="pomodoros" value={this.state.pomodoros} onChange={this.handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.validInputs()}>Create Todo!</button>
      </form>
    )
  }
});
