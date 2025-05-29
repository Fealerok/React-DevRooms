import React from 'react'
import styles from "./index.module.scss"

import delete_basket from "../../../assets/images/delete_basket.png";

const CompanyItem = ({
  id,
  name,
  description,
  updateCompanyList
}) => {

  const deleteCompany = async () => {
    console.log(id);
    const response = await fetch("http://localhost:3030/delete-company", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({idCompany: id})
    });

    updateCompanyList();
  }


  return (
    <div className={styles.company_item}>
        <div className={styles.company_item_text}>
            <span>{name}</span>
            <span style={description == "" ? {color: "#64616B"} : null}>{description == "" ? "описание отсутствует" : description}</span>
        </div>
        <button onClick={deleteCompany}>
          <img src={delete_basket} alt="" />
        </button>
    </div>
  )
}

export default CompanyItem