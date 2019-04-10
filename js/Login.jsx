import React, { Component } from 'react';
import Styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import API from './API'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

const Wrapper = Styled.div`

  display: flex;
  flex-direction: column;
  width: 40vw;
  margin: 20vh auto;
  background-color: #b79fa4;
  border-radius: 5px;
  padding: 20px;

  -webkit-box-shadow: 10px 11px 16px -6px rgba(48,48,48,1);
  -moz-box-shadow: 10px 11px 16px -6px rgba(48,48,48,1);
  box-shadow: 10px 11px 16px -6px rgba(48,48,48,1);
  `;

const LoginDiv = Styled.div`
display: flex;
flex-direction: column;
width: 30vw;
margin: auto;
background-color: #dcdcdc;
border-radius: 5px;
padding: 0px 10px 0px 10px;
`;

const LoginHeader = Styled.div`
text-align: center;
color: black;
height: 2vh;
line-height: 2vh;
padding: 20px;
font-weight: bold;
text-transform: uppercase;
background-color: #b79fa4;
`;

const initialState = {
  showSignup: false,
  name: '',
  password: '',
  confirmPassword: '',
  email: ''
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  toggleSignup = () => {
    this.setState({
      ...initialState,
      showSignup: !this.state.showSignup
    })
  }

  handleInput = (type, value) => this.setState({ [type]: value })

  handleSignUp = () => {
    const { password, confirmPassword, name, email } = this.state
    const payload = { name, password, email }
    if (confirmPassword !== password)
      return false;
    API.post('/user', payload)
    return true
  }

  renderLogin = () => {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    return (
      <div><LoginHeader>Log in</LoginHeader>
        <LoginDiv>

          <TextField value={this.state.name} onChange={(e) => { this.handleInput('name', e.target.value) }} label='Username' margin='normal' />
          <TextField value={this.state.password} onChange={(e) => { this.handleInput('password', e.target.value) }} type='password' label='Password' margin='normal' />
          <div style={{ 'margin': 'auto' }}>

            <Button variant="contained" color="primary" className={classes.button}>
              Login
        </Button>

            <Button onClick={this.toggleSignup} variant="contained" className={classes.button}>
              Signup
        </Button>

          </div>
        </LoginDiv></div>)
  }
  renderSignup = () => {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    return (
      <div> <LoginHeader>Sign up to get started</LoginHeader>
        <LoginDiv>

          <TextField value={this.state.name} onChange={(e) => { this.handleInput('name', e.target.value) }} label='Username' margin='normal' />
          <TextField value={this.state.email} onChange={(e) => { this.handleInput('email', e.target.value) }} label='Email Address' margin='normal' />
          <TextField value={this.state.password} onChange={(e) => { this.handleInput('password', e.target.value) }} type='password' label='Password' margin='normal' />
          <TextField value={this.state.confirmPassword} onChange={(e) => { this.handleInput('confirmPassword', e.target.value) }} type='password' label='Confirm Password' margin='normal' />
          <div style={{ 'margin': 'auto' }}>


            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSignUp}>
              Create
        </Button>

            <Button onClick={this.toggleSignup} variant="contained" className={classes.button}>
              Cancel
        </Button>
          </div>
        </LoginDiv></div>)
  }

  render() {
    return (
      <Wrapper>

        {this.state.showSignup ?
          this.renderSignup() :
          this.renderLogin()
        }

      </Wrapper>
    );
  }
}

export default withStyles(styles)(Login);
