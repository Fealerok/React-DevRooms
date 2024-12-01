import React, { useState } from 'react';
import {Link} from "react-router-dom";

import styles from "./index.module.scss";
import HeaderLoginPage from '../Header';
import Input from '../../Input';

const LoginForm = () => {

    

  return (
    <div className={styles.loginForm}>
      <HeaderLoginPage title={"Авторизация"} />

      <div className={styles.inputForm}>
        <Input title={"Введите логин"} typeInput={"text"}/>
        <Input title={"Введите пароль"} typeInput={"password"}/>
      </div>

      <div className={styles.bottom_container}>
        <button>Войти</button>
      </div>

    </div>
  )
}

export default LoginForm