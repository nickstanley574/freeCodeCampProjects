const projectName = "drum-machine";

const soundbank1 = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    }, 
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    }, 
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    }, 
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    },
];

class DrumPad extends React.Component {
    constructor(props) {
        super(props);
        this.playsound = this.playsound.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.state = {
            id: soundbank1[this.props.clipId].id,
            keyTrigger: soundbank1[this.props.clipId].keyTrigger,
            keyCode: soundbank1[this.props.clipId].keyCode,
            url: soundbank1[this.props.clipId].url
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(e) {
        if (e.keyCode === this.state.keyCode) {
            this.playsound();
        }
    }

    playsound() {
        const i = this.props.clipId;
        const audio = new Audio(this.state.url)
        audio.play()
    }

    render() {
        return (
            <div className="drum-pad"
                id={this.state.id}
                onClick={this.playsound}
                onKeyPress={this.playsound}>
                {this.state.keyTrigger}
            </div>
        )
    }
}


class PadBank extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="pad-bank" >
                <DrumPad clipId="0" />
                <DrumPad clipId="1" />
                <DrumPad clipId="2" />
                <DrumPad clipId="3" />
                <DrumPad clipId="4" />
                <DrumPad clipId="5" />
                <DrumPad clipId="6" />
                <DrumPad clipId="7" />
                <DrumPad clipId="8" />
            </div>
        )
    }
}



class App extends React.Component {
    constructor(props) {
        super(props);
        this.playsound = this.playsound.bind(this);

    }

    playsound() {
        console.log("App playsound()")
        const audio = new Audio(button1[1].url)
        audio.play()
    }

    render() {
        return (
            <div id="drum-machine">
                <div id="display">
                    <h1>Drum Machine</h1>
                    <PadBank />
                </div>
            </div>
        )
    }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
