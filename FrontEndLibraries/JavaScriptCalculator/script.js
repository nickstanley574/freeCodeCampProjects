
const projectName = 'javascript-calculator';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 0,
            prevDisplay: 0,
            hasBeenClicked: false
        };
        this.displayCallback = this.displayCallback.bind(this);
    }


    displayCallback = (e) => {
        console.log(e.target)

        if (this.state.display == '0'){
            var result = e.target.value
        } else {
            var result = this.state.display + e.target.value;
        }

        this.setState({
            display: result
        })
    }

    displayClear = () => {
        this.setState({
            display: 0
        })
    }

    evaluateExpression = () => {
        var result = eval(this.state.display);
        console.log(result);
        this.setState({
            display: result
        })
    }

    handleClick = () => {
        this.setState({
          hasBeenClicked: true
        })
    }

    render () {
        return (
            // <h1>Hello World</h1>
            <div>
                <div id="display">
                    {this.state.display}
                </div>
                <button id="clear" onClick={this.displayClear}>AC</button>

                <button id="zero"  value='0'  onClick={e => this.displayCallback(e, "value")}>0</button>
                <button id="one"   value='1'  onClick={e => this.displayCallback(e, "value")}>1</button>
                <button id="two"   value='2'  onClick={e => this.displayCallback(e, "value")}>2</button>
                <button id="three" value='3'  onClick={e => this.displayCallback(e, "value")}>3</button>
                <button id="four"  value='4'  onClick={e => this.displayCallback(e, "value")}>4</button>
                <button id="five"  value='5'  onClick={e => this.displayCallback(e, "value")}>5</button>
                <button id="six"   value='6'  onClick={e => this.displayCallback(e, "value")}>6</button>
                <button id="seven" value='7'  onClick={e => this.displayCallback(e, "value")}>7</button>
                <button id="eight" value='8'  onClick={e => this.displayCallback(e, "value")}>8</button>
                <button id="nine"  value='9'  onClick={e => this.displayCallback(e, "value")}>9</button>

                <button id="add"      value='+'  onClick={e => this.displayCallback(e, "value")}>+</button>
                <button id="subtract" value='-'  onClick={e => this.displayCallback(e, "value")}>-</button>
                <button id="multiply" value='*'  onClick={e => this.displayCallback(e, "value")}>*</button>
                <button id="divide"   value='/'  onClick={e => this.displayCallback(e, "value")}>/</button>
                <button id="decimal"  value='.'  onClick={e => this.displayCallback(e, "value")}>.</button>

                <button id="equals"   onClick={this.evaluateExpression}>=</button>

                <p>I have {this.state.hasBeenClicked ? null : 'not'} been clicked!</p>
                <button onClick={this.handleClick}>Click me!</button>
            </div>
        );
    }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
