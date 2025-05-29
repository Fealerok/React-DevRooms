import React, { useState } from 'react'
import styles from "./index.module.scss";

const CustomSelectVacancy = ({
    header,
    options,
    isCreateWindow,
    selectedDisabledOption,
    setValue
}) => {
    const [selectValue, setSelectValue] = useState(selectedDisabledOption);

    const changeSelectValueHandle = (e) => {
        setSelectValue(e.target.value);
        setValue(e.target.value);
    }
    const stylesSelect = {
        color: isCreateWindow ? "#64616B" : "#6B5798",
        fontSize: 14,
    }
  return (

    <div className={styles.custom_select}>
        <span 
        style={stylesSelect}>{header}</span>
        <select 
        value={selectValue}
        onChange={changeSelectValueHandle}>
            <option selected disabled>{selectedDisabledOption}</option>
            {options.map((option => <option id={option.id}>{option.name}</option>))}
        </select>
    </div>
  )
}

export default CustomSelectVacancy