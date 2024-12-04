import React from 'react';
import styles from "./index.module.scss";

const Input = ({title, typeInput, getInputValue}) => {
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
                />) : (
              <input 
                type={typeInput} 
                placeholder='' 
                onChange={(e) => {
                  getInputValue(e.target.value)
                }}
              />)
        }
        <label htmlFor="">{title}</label>
    </div>
  )
}

export default Input