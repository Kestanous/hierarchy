import React from 'react';
import TextField from 'material-ui/TextField';

export default Form = {
  GameGeneral(style) {
    return(
      <div style={style}>
        <TextField ref='name' fullWidth={true} floatingLabelText="Name" />
        <TextField ref='cover' fullWidth={true} floatingLabelText="Cover Url" />
        <TextField ref='description' fullWidth={true} floatingLabelText="Game Description" multiLine={true} />
      </div>
    );
  },
  GameAddPlayer(style) {
    return(
      <div style={style}>
        <TextField ref='email' fullWidth={true} floatingLabelText="email" />
      </div>
    );
  }
}
