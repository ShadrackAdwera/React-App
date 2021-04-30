import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const initialState = {
  email: '',
  password: '',
  isValid: null
}

const reducer = (state,action) => {
  switch(action.type) {
    case 'CHANGE_EMAIL':
      return {
        email: action.email,
        isValid: action.email.includes('@')
      }
    case 'INPUT_BLUR':
      return {
        email: state.email,
        isValid: state.email.includes('@')
      }
    default:
      return state;
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatch] = useReducer(reducer, initialState);

  // useEffect(()=>{
  //   const timer = setTimeout(()=>{
  //     setFormIsValid(enteredEmail.includes('@') && enteredPassword.length>6);
  //   },500)
  //   return () => clearTimeout(timer);
  // },[enteredEmail,enteredPassword])

  const emailChangeHandler = (event) => {
    dispatch({type: 'CHANGE_EMAIL', email: event.target.value});
    setFormIsValid(event.target.value.includes('@') && enteredPassword.length>6);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(emailState.isValid && enteredPassword.length>6);
  };

  const validateEmailHandler = () => {
    dispatch({type: 'INPUT_BLUR'})
    //setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.email, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
