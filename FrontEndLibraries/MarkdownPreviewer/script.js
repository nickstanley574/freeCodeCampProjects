const projectName = "markdown-previewer";

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
    breaks: true,
  });

console.log(marked('[link](www)'))

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

const Toolbar = (props) => {
    return (
      <div className="toolbar">
        <i title="no-stack-dub-sack" className="fa fa-free-code-camp"/>      
        {props.text}
        <i onClick={props.onClick} className={props.icon}></i>
      </div>
   )
}

const Editor = (props) => {
  return (
    <textarea id="editor"
      value={props.markdown}
      onChange={props.onChange}
      type="text"/>
    )
}
const Preview = (props) => {
  return (
    <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.markdown, {renderer: renderer})}}/>
  )
}


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
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
      this.setState({
        markdown: e.target.value
      });
    }
    render() {
        return (
            <div>
                <h3>Markdown Previewer</h3>
                <div className='editorWrap'>
                    <Toolbar text="Editor"/>
                    <Editor markdown={this.state.markdown}/>  
                </div>
                <div className='previewWrap'>
                  <Toolbar text="Previewer"/>
                  <Preview markdown={this.state.markdown}/> 
                </div>
            </div>
        )
    }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
