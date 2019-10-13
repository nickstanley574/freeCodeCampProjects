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

    handleKeyPress(event) {
        if (event.keyCode === this.state.keyCode) {
            this.playsound();
        }
    }

    playsound = () => {
        const audio = document.getElementById(this.state.keyTrigger);
        audio.play();
        this.props.displayClipNameCallback(this.state.id);
    }

    render() {
        console.log(this.props)
        return (
            <div className="drum-pad"
                id={this.state.id}
                onClick={this.playsound}
                onKeyPress={this.playsound}>
                <audio className='clip' id={this.state.keyTrigger} src={this.state.url}></audio>
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
                    <div class="row">
                        <DrumPad clipId="0" displayClipNameCallback={this.props.displayClipNameCallback}/>
                        <DrumPad clipId="1" displayClipNameCallback={this.props.displayClipNameCallback}/>
                        <DrumPad clipId="2" displayClipNameCallback={this.props.displayClipNameCallback}/>
                    </div>
                    <div class="row">
                        <DrumPad clipId="3" displayClipNameCallback={this.props.displayClipNameCallback}/>
                        <DrumPad clipId="4" displayClipNameCallback={this.props.displayClipNameCallback}/>
                        <DrumPad clipId="5" displayClipNameCallback={this.props.displayClipNameCallback}/>
                    </div>
                    <div class="row">
                        <DrumPad clipId="6" displayClipNameCallback={this.props.displayClipNameCallback}/>
                        <DrumPad clipId="7" displayClipNameCallback={this.props.displayClipNameCallback}/>
                        <DrumPad clipId="8" displayClipNameCallback={this.props.displayClipNameCallback}/>
                    </div>
            </div>
        )
    }
}



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "start1",
        };
        this.displayClipNameCallback = this.displayClipNameCallback.bind(this);
    }

    displayClipNameCallback = (value) => {
        this.setState({
            display: value
        })
    }

    render() {
        return (
            <div id="drum-machine">
                <div id="display">
                    <h1 id="title">Drum Machine</h1>
                    <PadBank displayClipNameCallback={this.displayClipNameCallback}/>
                    <p id="active">{this.state.display}</p>
                </div>
            </div>
        )
    }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
