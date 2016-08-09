import React, { Component } from 'react';


export default class Form extends Component {
  constructor(props) {
		super(props)
		this.state = {
      values: props.values || {}
    }
	}
	render() {
    return (
      <div>
        {React.Children.map(this.props.children, (child) => this.setSubChildrenProps(child))}
      </div>
    )
  }
  setChildrenProps(child) {
    return React.cloneElement(child, {
      onChange: (event, key, payload) => {
        this.onChange(child.ref, event, key, payload)
      },
      value: this.state.values[child.ref] || '' //forces it to be a controled input
    })
  }
  setSubChildrenProps(child) {
    if (!child) return child
    if (child.ref) return this.setChildrenProps(child)
    if (!child.props || !child.props.children) return child
    return React.cloneElement(child, {
      children: child.props.children.map((subChild) => {
        if (!subChild.ref) return this.setSubChildrenProps(subChild)
        else return this.setChildrenProps(subChild)
      })
    })
  }

  onChange(name, event, value, payload) {
    let out;
    if (payload) out = payload
    else if (value) out = value
    else out = event.target.value

    let values = this.state.values
    values[name] = out
    this.setState({values})
    this.props.update(values, this.props.index)
  }
}
