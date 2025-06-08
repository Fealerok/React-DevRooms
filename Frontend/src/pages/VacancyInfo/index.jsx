import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss"

import { useParams } from 'react-router-dom';

const VacancyInfo = () => {

    const {idVacancy} = useParams();
    const [vacancyInfo, setVacancyInfo] = useState(null)

    const getVacancyInfo = async () => {
        const response = fetch("http://localhost:3030/get-vacancy-info", {
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: idVacancy
            })
          })

        const info = await ((await response).json());

        setVacancyInfo(info.vacancyInfo);
        console.log(info.vacancyInfo);
    }

    useEffect(() => {
       getVacancyInfo();   
    }, []);

    if (vacancyInfo){
        return (
            <div className={styles.vacancy_info}>
                <div className={styles.info_container}>
        
                    <div className={styles.info}>
                        <header>{vacancyInfo.name_vacancy}</header>
                        <div className={styles.salary}>
                            <span>Зарплата:</span>
                            <span>от {vacancyInfo.salary} рублей</span>
                        </div>
        
                        <div className={styles.specializations}>
                            <span>Требования:</span>
                            <span>{vacancyInfo.name_qualification} * {vacancyInfo.specializations.split(", ").join(" * ")}</span>
                        </div>
        
                        <div className={styles.location_typeOfEmployments}>
                            <span>Местоположение и тип занятости:</span>
                            <span>{vacancyInfo.location}, {vacancyInfo.name_typeofemployment}</span>
                        </div>
                    </div>
        
                    <div className={styles.description}>
                        <header>Описание вакансии</header>
                        {vacancyInfo.description.split("\n").map((line, i) => (
                            <span key={i}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </div>
        
                    <div className={styles.contacts}>
                        <header>Контакты для отклика</header>
                        <span>{vacancyInfo.phone} - Главный менеджер</span>
                    </div>
                </div>
                <div className={styles.company_info_container}>
                    <header>{vacancyInfo.name_company}</header>
                    <span>{vacancyInfo.description_company}</span>
                </div>
            </div>
          )
    }
    
  
}

export default VacancyInfo