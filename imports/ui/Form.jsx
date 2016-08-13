import React, { Component } from 'react';


export default class Form extends Component {
  constructor(props) {
		super(props)
    let validations = {}, isInvalid = false
    if (props.validators) {
      this.getChildrenRefs(this.props.children).forEach((key) => {
        if (props.validators[key]) {
          validations[key] = props.validators[key](Objectifier.get(key, false, this.props.values || {}), this.props.values)
          if (validations[key]) isInvalid = true
        }
      })
    }

		this.state = {
      values: JSON.parse(JSON.stringify(props.values || {})),
      validations,
      isInvalid
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
    if (child.ref == 'submit') {
      return React.cloneElement(child, {
        onClick: this.onSave.bind(this),
        disabled: this.state.isInvalid
      })
    }


    let value = Objectifier.get(child.ref, false, this.state.values),
    defaultValue = Objectifier.get(child.ref, false, this.props.values || {}),
    errorText

    if (value != defaultValue) {
      errorText = this.state.validations[child.ref]
    }

    if (value == null || value == undefined) value = '' //forces it to be a controled input

    return React.cloneElement(child, {
      onChange: (event, key, payload) => {
        this.onChange(child.ref, event, key, payload)
      },
      value,
      errorText
    })
  }

  setSubChildrenProps(child) {
    if (!child) return child
    if (child.ref) return this.setChildrenProps(child)
    if (!child.props || !child.props.children) return child
    return React.cloneElement(child, {
      children: React.Children.map(child.props.children, (subChild) => {
        if (!subChild.ref) return this.setSubChildrenProps(subChild)
        else return this.setChildrenProps(subChild)
      })
    })
  }

  getChildrenRefs(children, out = []) {
    React.Children.map(children, (child) => this.getChildRefs(child, out) )
    return out
  }

  getChildRefs(child, out = []) {
    if (!child) return
    if (child.ref && child.ref != 'submit') {
      out.push(child.ref)
      return
    }
    if (!child.props || !child.props.children) return
    this.getChildrenRefs(child.props.children, out)
  }

  onChange(name, event, value, payload) {
    let out, isInvalid, {values, validations} = this.state,
    {validators, update} = this.props

    if (payload) out = payload
    else if (value) out = value
    else out = event.target.value

    Objectifier.set(name, out, values)

    if (validators && validators[name]) {
      validations[name] = validators[name](out, values)
      isInvalid = Object.values(validations).filter((value) => value).length > 0
    }

    this.setState({values, validations, isInvalid})
    if (update) update(values, this.props.index)
  }

  onSave() {
    let {isInvalid, values} = this.state, {save} = this.props
    if (!isInvalid && save) save(values)
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
