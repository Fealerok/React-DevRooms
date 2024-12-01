import React from 'react';
import styles from "./index.module.scss";

const Input = ({title, typeInput}) => {
  return (
    <div className={styles.inputForm}>
        {typeInput == "password" ? <input type='password' placeholder='' /> : <input type={typeInput} placeholder=''/>}
        <label htmlFor="">{title}</label>
    </div>
  )
}

export default Input