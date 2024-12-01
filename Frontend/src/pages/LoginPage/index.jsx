import React from 'react'
import { useState } from 'react';
import styles from "./index.module.scss";
import LoginForm from '../../components/LoginPage/LoginForm';
import RegistrationForm from '../../components/LoginPage/RegistrationForm';

const LoginPage = () => {
  
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className={styles.loginPage}>
      {isLoginForm ? <LoginForm /> : <RegistrationForm />}
    </div>
  )
}

export default LoginPage