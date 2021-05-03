import React, { useState, useEffect, useReducer, useContext } from 'react';

import AuthContext from '../../store/auth-context';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const initialState = {
  email: '',
  password: '',
  isEmailValid: null,
  isPasswordValid: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_EMAIL':
      return {
        ...state,
        email: action.email,
        isEmailValid: action.email.includes('@'),
      };
    case 'CHANGE_PASSWORD':
      return {
        ...state,
        password: action.password,
        isPasswordValid: action.password.trim().length > 6,
      };
    case 'INPUT_BLUR':
      return {
        ...state,
        email: state.email,
        isEmailValid: state.email.includes('@'),
      };
    case 'PASSWORD_BLUR':
      return {
        ...state,
        password: state.password,
        isPasswordValid: state.password.trim().length > 6,
      };
    default:
      return state;
  }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const { login } = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatch] = useReducer(reducer, initialState);
  const { isEmailValid, isPasswordValid } = emailState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(isEmailValid && isPasswordValid);
    }, 500);
    return () => clearTimeout(timer);
  }, [isEmailValid, isPasswordValid]);

  const emailChangeHandler = (event) => {
    dispatch({ type: 'CHANGE_EMAIL', email: event.target.value });
    //setFormIsValid(event.target.value.includes('@') && emailState.isPasswordValid);
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: 'CHANGE_PASSWORD', password: event.target.value });
    // setEnteredPassword(event.target.value);
    //setFormIsValid(emailState.isEmailValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatch({ type: 'INPUT_BLUR' });
    //setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatch({ type: 'PASSWORD_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    login(emailState.email, emailState.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        
        <div
          className={`${classes.control} ${
            emailState.isPasswordValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={emailState.password}
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
