
const projectName = 'javascript-calculator';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 0,
      prevDisplay: 0,
      hasBeenClicked: false,
      decimalAllowed: true,
      prevWasOperator: false,
    };
  }



  displayOperator = (e) => {
    var result = this.state.display

    if (/^(.*?)[*/+-][*/+-]$/.test(result)) {
      result = result.substring(0, result.length - 2);
    }
    else if (this.state.prevWasOperator && e.target.value != "-") {
      result = result.substring(0, result.length - 1);
    }

    if (!result.endsWith('-')) {
      result = result + e.target.value;
    }

    this.setState({
      display: result,
      decimalAllowed: true,
      prevWasOperator: true
    })
  }



  displayNumber = (e) => {
    var result = this.state.display

    if (this.state.display == '0') {
      result = e.target.value
    } else {
      result = result + e.target.value;
    }

    this.setState({
      display: result,
      prevWasOperator: false
    })
  }



  displayDecimal = (e) => {
    var result = this.state.display

    if (this.state.decimalAllowed) {
      var result = this.state.display + "."
    }

    this.setState({
      display: result,
      decimalAllowed: false
    })
  }



  displayClear = () => {
    this.setState({
      display: 0,
      decimalAllowed: true,
      prevWasOperator: false
    })
  }



  evaluateExpression = () => {
    var result = eval(this.state.display).toString();
    this.setState({
      display: result,
    })
  }



  render() {
    return (
      <div id="calculator">

        <div id="display">
          {this.state.display}
        </div>

        {/* Row 1 */}
        <div>

          <button id="clear"
            className="largeButton"
            onClick={this.displayClear}
            >
            AC
          </button>

          <button id="divide"
            className="operator"
            value='/'
            onClick={e => this.displayOperator(e, "value")}
            >
            /
          </button>

          <button id="multiply"
            className="operator"
            value='*'
            onClick={e => this.displayOperator(e, "value")}
            >
            *
          </button>

        </div>

        {/* Row 2 */}
        <div>

          <button id="one"
            value='1'
            onClick={e => this.displayNumber(e, "value")}
            >
            1
          </button>

          <button id="two"
            value='2'
            onClick={e => this.displayNumber(e, "value")}
            >
            2
          </button>

          <button id="three"
            value='3'
            onClick={e => this.displayNumber(e, "value")}
            >
            3
          </button>

          <button id="add"
            className="operator"
            value='+'
            onClick={e => this.displayOperator(e, "value")}
            >
            +
            </button>

        </div>

        {/* Row 3 */}
        <div>

          <button
            id="four"
            value='4'
            onClick={e => this.displayNumber(e, "value")}
            >
            4
          </button>

          <button id="five"
            value='5'
            onClick={e => this.displayNumber(e, "value")}
            >
            5
          </button>

          <button id="six"
            value='6'
            onClick={e => this.displayNumber(e, "value")}
            >
            6
          </button>

          <button id="subtract"
            className="operator"
            value='-' onClick={e => this.displayOperator(e, "value")}
            >
            -
            </button>
        </div>

        {/* Row 4 */}
        <div>

          <button id="seven"
            value='7'
            onClick={e => this.displayNumber(e, "value")}
            >
            7
        </button>

        <button id="eight"
          value='8'
          onClick={e => this.displayNumber(e, "value")}
          >
          8
        </button>

        <button id="nine"
          value='9'
          onClick={e => this.displayNumber(e, "value")}
          >
          9
        </button>

        </div>

        {/* Row 5 */}
        <div>

          <button id="zero"
            className="largeButton"
            value='0'
            onClick={e => this.displayNumber(e, "value")}
            >
            0
          </button>

          <button id="decimal"
            onClick={this.displayDecimal}
            >
            .
          </button>

        </div>

        {/* Special equals positioning */}
        <button id="equals"
          onClick={this.evaluateExpression}
          >
          =
        </button>

      </div>
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
