import React from 'react'
import styles from "./index.module.scss";

import HeaderLoginPage from '../Header';
import Input from '../../Input';

const RegistrationForm = () => {
  return (
    <div className={styles.registrationForm}>
      <HeaderLoginPage title={"Регистрация"} />

      <div className={styles.inputForm}>
        <Input title={"Введите логин"} typeInput={"text"}/>
        <Input title={"Введите почту"} typeInput={"email"}/>
        <Input title={"Введите пароль"} typeInput={"password"}/>
      </div>

      <div className={styles.bottom_container}>
        <button>Зарегистрироваться</button>
      </div>

    </div>
  )
}

export default RegistrationForm