PomodoroTimer = React.createClass({
  getInitialState() {
    var pomodoros = this.props.todo ? this.props.todo.pomodoros : null
    return {
      elapsed: this.props.elapsed,
      pomodoros: pomodoros,
      working: true
    };
  },

  componentWillUnmount() {
    clearInterval(this.timer);
  },

  startTimer() {
    this.timer = setInterval(this.tick, 1000);
  },

  stopTimer() {
    clearInterval(this.timer);
    var pomodoros = this.state.pomodoros += 1;
    this.setState({elapsed: this.props.elapsed, pomodoros: pomodoros});
  },

  updatePomodoros() {
    if (this.props.todo) {
      $.ajax('todos/' + this.props.todo.id, {
        data: {
          todo: {
            "pomodoros": this.state.pomodoros
          }
        },
        error: function(data) {
          alert("Something has gone very, very, wrong! PANIC MODE ACTIVATED");
        }.bind(this),
        type: "PUT"
      });
    }
  }

  tick() {
    var elapsed = this.state.elapsed - 1;
    if (elapsed === 0) {
      var pomodoros = this.state.pomodoros + 1
      this.setState({elapsed: this.props.elapsed, pomodoros: pomodoros});
      this.stopTimer();
    } else {
      this.setState({elapsed: elapsed});
    }
  },

  render() {
    if (this.props.todo) {
      return (
        <div>
          <button className="btn btn-success" onClick={this.startTimer}>Start!</button>
          <button className="btn btn-danger" onClick={this.stopTimer}>End Pomodoro</button>
          <h4>{this.props.todo.title}</h4>
          <h6>{this.state.pomodoros}</h6>
          <h2>{this.state.elapsed}</h2>
        </div>
      )
    } else {
      return (
        <div>NO TODO LIST ITEM SELECTED</div>
      );
    }
  }
});
