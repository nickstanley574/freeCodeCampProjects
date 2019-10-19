const projectName = 'pomodoro-clock';

const defaultState = {
    breaklength: 5,
    sessionlength: 25,
    running: false,
    min: 25,
    sec: 0,
    type: "Session"
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
    }


    countdown() {

        this.myInterval = setInterval(() => {
            if (this.state.running) {
                const {sec, min} = this.state

                if (sec > 0) {
                    this.setState(({ sec }) => ({
                        sec : sec - 1
                    }))
                }
                if (sec === 0) {
                    if (min === 0) {
                        this.switchType()
                    } else {
                        this.setState(({min}) => ({
                            min: min -1,
                            sec: 59
                        }))
                    }
                }
            }
        }, 1000)
    }

    switchType() {

        var type = "Session"
        var min  = this.state.sessionlength

        if (this.state.type == "Session") {
            type = "Break"
            min  = this.state.breaklength
        }

        this.audioBeep.play();

        this.setState({
            min: min,
            type: type
        })
    }

    breakIncrement = () => {
        var breaklength = this.state.breaklength + 1
        if (breaklength <= 60){
            this.setState({
                breaklength: breaklength,
            })
        }
    }

    breakDecrement = () => {
        var breaklength = this.state.breaklength - 1
        if (breaklength != 0){
            this.setState({
                breaklength: breaklength,
            })
        }
    }

    sessionIncrement = () => {
        var sessionlength = this.state.sessionlength + 1
        if (sessionlength <= 60){
            this.setState({
                sessionlength: sessionlength,
                min:sessionlength
            })
        }
    }

    sessionDecrement = () => {
        var sessionlength = this.state.sessionlength - 1
        if (sessionlength != 0){
            this.setState({
                sessionlength: sessionlength,
                min:sessionlength
            })
        }
    }

    reset = () => {
        this.setState(defaultState);
        this.audioBeep.pause();
        this.audioBeep.currentTime = 0;
        clearInterval(this.myInterval);
    }

    running = () => {
        var isRunning = true
        if (this.state.running){
            isRunning = false
        }

        this.countdown();

        this.setState({
            running:isRunning
        })
    }

    render() {
        const { min, sec } = this.state
        return (
        <div>
            <div className="main-title">
                Pomodoro Clock
            </div>

            <div id="lengths">

                <div id="break-label">
                    Break Length
                </div>

  
                <div className="controls">

                    <button id="break-decrement" onClick={this.breakDecrement}>
                        <i class="fa fa-caret-down fa-3x" aria-hidden="true"></i>
                    </button>

                    <div id="break-length">
                        {this.state.breaklength}
                    </div>

                    <button id="break-increment" onClick={this.breakIncrement}>
                        <i class="fa fa-caret-up fa-3x" aria-hidden="true"></i>
                    </button>

                </div>

                <div id="session-label">
                    Session Length
                </div>
                <div className="controls">

                    <button id="session-decrement" onClick={this.sessionDecrement}>
                        <i className="fa fa-caret-down fa-3x" aria-hidden="true"></i>
                    </button>

                    <div id="session-length">
                        {this.state.sessionlength}
                    </div>

                    <button id="session-increment" onClick={this.sessionIncrement}>
                        <i className="fa fa-caret-up fa-3x" aria-hidden="true"></i>
                    </button>

                </div>


            </div>

            <div id="timer">

                <div id="timer-label">
                    {this.state.type}
                </div>

                <div id="time-left">
                    {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
                </div>

                <button id="start_stop" onClick={this.running}>
                    {this.state.running ?
                        <i class="fa fa-pause-circle fa-3x" aria-hidden="true"></i>
                        :
                        <i class="fa fa-play-circle-o fa-3x" aria-hidden="true"></i>
                    }
                </button>
            </div>


            <button id="reset" onClick={this.reset}>
                <i class="fa fa-repeat fa-2x" aria-hidden="true"></i>
            </button>

            <audio id="beep" preload="auto"
                src="https://goo.gl/65cBl1"
                ref={(audio) => { this.audioBeep = audio; }} />
            </div>
        );
    }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));