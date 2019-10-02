const projectName = "markdown-helloworld";

class Hello extends React.Component{
    constructor(props) {
      super(props);
    }
    render() {
        return (
            <h3>Hello World!</h3>
        )
    }
}

ReactDOM.render(React.createElement(Hello, null), document.getElementById("hello"));
