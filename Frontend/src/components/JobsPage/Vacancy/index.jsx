import React from 'react'
import styles from "./index.module.scss"
import { Link } from 'react-router-dom';

import delete_basket from "../../../assets/images/delete_basket.png";
import location_img from "../../../assets/images/location.png";

const Vacancy = ({
  id,
  name_company,
  name_vacancy,
  name_qualification,
  specializations,
  salary, 
  location,
  name_typeOfEmployment
}) => {

  const deleteVacancy = async () => {
    const response = await fetch("http://localhost:3030/delete-vacancy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id
      })
    });

    parent.location.reload();
  }

  return (
    <div className={styles.vacancy}>
      <div className={styles.vacancy_info}>
        <span>{name_company}</span>
        <Link to={`/jobs/${id}`} >{name_vacancy}</Link>
        <span>{name_typeOfEmployment}</span>
        <span>{salary} рублей</span>
        <div className={styles.specializations_container}>
          <span>{name_qualification} * {specializations.split(", ").join(" * ")}</span>
        </div>
        <span>
          <img src={location_img} alt="" />
          <span>{location}</span>
        </span>
      </div>
      <div className={styles.bottom_container}>
        <button onClick={deleteVacancy}>
          <img src={delete_basket} alt="" />
        </button>
      </div>
    </div>
  )
}

export default Vacancy