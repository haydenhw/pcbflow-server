import React from 'react';
import InlineEdit from 'react-edit-inline';

import './top-navbar-styles/TopNavbarEditableText.css'

export default class TopNavbarEditableText extends React.Component {
    constructor(props){
      super(props);
      this.dataChanged = this.dataChanged.bind(this);
      this.state = {
        message: 'Click to Edit'
      }
    }
 
    dataChanged(data) {
        this.props.handleNameChange(data)
        this.setState({...data})
    }
 
    customValidateText(text) {
      return (text.length > 0 && text.length < 64);
    }
    
    render() {
        return (<div>
            <InlineEdit
              validate={this.customValidateText}
              className="editable-project-title"
              activeClassName="editing"
              text={this.props.text || ''}
              paramName="message"
              change={this.dataChanged}
              style={{
                minWidth: 150,
                display: "inline-block",
                margin: "13px 10px",
                padding: 0,
                fontSize: 20,
                border: 0
              }}
            />
        </div>)
    }
}
