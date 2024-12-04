import React, { useEffect, useRef, useState } from 'react';
import {Link} from "react-router-dom";

import styles from "./index.module.scss";
import HeaderLoginPage from '../Header';
import Input from '../../Input';

import checkEmptyValues from "../buttonHandle";

const LoginForm = () => {

  const [loginInput, setLoginInput] = useState(null);
  const [passwordInput, setPasswordInput] = useState(null);

  const loginButtonHandle = async () => {
    try {
      if (!checkEmptyValues([loginInput, passwordInput])){
        const response = await fetch("http://localhost:3030/login-user", {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            login: loginInput, 
            password: passwordInput
          })
        });
        
      }
    } catch (error) {
      
    }

  }



  return (
    <div className={styles.loginForm}>
      <HeaderLoginPage title={"Авторизация"} />

      <div className={styles.inputForm}>
        <Input title={"Введите логин"} typeInput={"text"} getInputValue={setLoginInput} />
        <Input title={"Введите пароль"} typeInput={"password"} getInputValue={setPasswordInput}/>
      </div>

      <div className={styles.bottom_container}>
        <button onClick={() => checkEmptyValues([loginInput, passwordInput])}>Войти</button>
      </div>

    </div>
  )
}

export default LoginForm