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
      <div className='Form' style={this.props.styles}>
        {React.Children.map(this.props.children, (child) => this.setSubChildrenProps(child))}
      </div>
    )
  }
  setChildrenProps(child) {
    let value = Objectifier.get(child.ref, false, this.state.values)
    if (value == null || value == undefined) value = '' //forces it to be a controled input

    return React.cloneElement(child, {
      onChange: (event, key, payload) => {
        this.onChange(child.ref, event, key, payload)
      },
      value: value
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
    let out, values = this.state.values;

    if (payload) out = payload
    else if (value) out = value
    else out = event.target.value

    Objectifier.set(name, out, values)

    this.setState({values})
    this.props.update(values, this.props.index)
  }
}



// Utility method to get and set objects that may or may not exist
var objectifier = function(splits, create, context) {
	var result = context || window;
	for(var i = 0, s; result && (s = splits[i]); i++) {
		result = (s in result ? result[s] : (create ? result[s] = {} : undefined));
	}
	return result;
};

let Objectifier = {
	// Creates an object if it doesn't already exist
	set: function(name, value, context) {
		var splits = name.split('.'), s = splits.pop(), result = objectifier(splits, true, context);
		return result && s ? (result[s] = value) : undefined;
	},
	get: function(name, create, context) {
		return objectifier(name.split('.'), create, context);
	},
	exists: function(name, context) {
		return this.get(name, false, context) !== undefined;
	}
};
