import React from 'react';
import styles from "./index.module.scss";

const Input = ({title, typeInput, getInputValue, isMessage}) => {
  return (
    <div className={styles.inputForm}>
        {
          typeInput == "password" ? (
              <input 
                type='password' 
                placeholder='' 
                onChange={(e) => {
                  getInputValue(e.target.value)
                }} 
                className={isMessage ? styles.message : ""}
                />) : (
              <input 
                type={typeInput} 
                placeholder='' 
                onChange={(e) => {
                  getInputValue(e.target.value)
                }}
                className={isMessage ? styles.message : ""}
              />)
        }
        <label htmlFor="" >{title}</label>
    </div>
  )
}

export default Input