import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    localStorage.setItem('isLoggedIn',JSON.stringify({email,password}));
    setIsLoggedIn(true);    
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  useEffect(()=>{
    const loginStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
    if(loginStatus && loginStatus.email && loginStatus.password) {
      setIsLoggedIn(true);
    }
  },[isLoggedIn])

  return (
    <React.Fragment>
      <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: loginHandler, logout: logoutHandler}}>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
