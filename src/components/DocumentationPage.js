import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown'

const frontMatterRegex = /^---[\s\S]*---/gi

export default class DocumentationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          text: ''
        }
    };

    componentDidMount() {
      fetch(this.props.docUrl)
        .then(r => r.text())
        .then(r => r.replace(frontMatterRegex, ''))
        .then(
          (result) => {
            this.setState({
              isLoading: false,
              text: result
            })
        },
        (error) => {

        })
    }

    render() {
      const { text, isLoading } = this.state

      if (isLoading) {
        return (<div>Loading...</div>)
      }

      return (
        <div>
          <ReactMarkdown source={text}/>
        </div>
      )
    }
}