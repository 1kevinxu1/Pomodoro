PomodoroTimer = React.createClass({
  getInitialState() {
    var pomodoros = this.props.todo ? this.props.todo.pomodoros : null
    return {
      elapsed: 25*60,
      pomodoros: pomodoros,
      working: true,
      timerRunning: false
    };
  },

  componentWillUnmount() {
    clearInterval(this.timer);
  },

  timeElapsedToString(elapsed) {
    var minutes = parseInt(elapsed/60);
    var seconds = parseInt(elapsed%60);
    minutes = minutes > 9 ? "" + minutes : "0" + minutes;
    seconds = seconds > 9 ? "" + seconds : "0" + seconds;
    return minutes + " : " + seconds;
  },

  startTimer() {
    if (!this.state.timerRunning) {
      this.timer = setInterval(this.tick, 1000);
      this.setState({timerRunning: true});
    }
  },

  stopTimer() {
    clearInterval(this.timer);
    this.resetTimer();
  },

  resetTimer() {
    var pomodoros, elapsed;
    pomodoros = this.state.working ? this.state.pomodoros + 1 : this.state.pomodoros
    if (this.state.working) {
      elapsed = (this.state.pomodoros + 1) % 4 === 0 ? 25*60 : 5*60;
    } else {
      elapsed = 25*60;
    }
    var working = !this.state.working
    this.setState({elapsed: elapsed, pomodoros: pomodoros, working: working, timerRunning: false}, this.updatePomodoros);
    debugger;
  },

  updatePomodoros() {
    if (this.props.todo) {
      debugger;
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
  },

  tick() {
    var elapsed = this.state.elapsed - 1;
    if (elapsed === 0) {
      this.stopTimer();
    } else {
      this.setState({elapsed: elapsed});
    }
  },

  render() {
    if (this.props.todo) {
      return (
        <div>
          <h4 className="timer-title">{this.props.todo.title}</h4>
          <h6 className="timer-pomodoros">
            <span>Pomodoros Spent: {this.state.pomodoros}</span>
            {this.state.working ?
              <span className="tag working-tag">WORKING</span> :
              <span className="tag">ON A BREAK</span> }
          </h6>
          <h1 className="timer-timer">{this.timeElapsedToString(this.state.elapsed)}</h1>
          {this.state.timerRunning ? <button className="btn btn-block btn-danger" onClick={this.stopTimer}>End Early</button> :
            <button className="btn btn-block btn-success" onClick={this.startTimer}>Start!</button>
          }
        </div>
      )
    } else {
      return (
        <div className="no-todo">
          <h5> NO TODO LIST ITEM SELECTED</h5>
          <p> To begin, select or create a todo item from the menu. </p>
        </div>
      );
    }
  }
});
