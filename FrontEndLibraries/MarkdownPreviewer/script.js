class App extends React.Component{
    constructor(props) {
      super(props);
    }
    render() {
        return (
            <h3>Hello World!</h3>
        )
    }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
