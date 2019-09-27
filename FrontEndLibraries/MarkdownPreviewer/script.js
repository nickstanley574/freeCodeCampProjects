const projectName = "markdown-previewer";

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
    breaks: true,
  });

console.log(marked('[link](www)'))

const placeholder = 
`
# Place Holder Markdown 
### Hello World
`

class App extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
          markdown: placeholder
      }
    }
    render() {
        return (
            <h3>Markdown Previewer</h3>
        )
    }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
