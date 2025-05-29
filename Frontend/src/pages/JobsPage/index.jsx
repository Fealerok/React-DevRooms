import React, { useContext, useEffect, useState } from 'react'
import styles from "./index.module.scss"
import SearchWidget from '../../components/JobsPage/SearchWidget'
import FilterWidget from '../../components/JobsPage/FilterWidget'
import Vacancy from '../../components/JobsPage/Vacancy'
import { AuthContext } from '../../context/authContext'
import CreateVacancyWindow from '../../components/JobsPage/CreateVacancyWindow'
import { useNavigate } from 'react-router-dom'


const JobsPage = () => {

  const {user} = useContext(AuthContext);
  const [isCreateVacancy, setIsCreateVacancy] = useState(false);
  const [isCreateCompany, setIsCreateCompany] = useState(false);

  const [allVacancies, setAllVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);

  const [vacanciesCount, setVacanciesCount] = useState(0);
  const navigator = useNavigate();

  const getVacancies = async () => {
    const response = await fetch("http://localhost:3030/get-vacancies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const vacancies = (await response.json()).vacancies;

    console.log(vacancies)

    setAllVacancies(vacancies);
    setFilteredVacancies(vacancies);
  }

  useEffect(() => {
    getVacancies();
  }, []);
  

  useEffect(() => {
    setVacanciesCount(filteredVacancies.length);
    console.log(filteredVacancies);
  }, [filteredVacancies])

  useEffect(() => {
    console.log(isCreateVacancy);
  }, [isCreateVacancy]);

  return (
    <div className={styles.jobs_page}>
      <div className={styles.jobs_page_content}>
        <SearchWidget foundedVacanciesCount={vacanciesCount} />
        <div className={styles.vacancy_list}>
          {filteredVacancies.map(v => (
            <Vacancy key={v.id}
            id={v.id}
            name_company={v.name_company}
            name_vacancy={v.name_vacancy}
            name_qualification={v.name_qualification}
            specializations={v.specializations}
            salary={v.salary}
            location={v.location}
            name_typeOfEmployment={v.name_typeofemployment} />
            
          ))}
          
        </div>
        <div className={styles.buttons}>
          <button onClick={() => setIsCreateVacancy(true)} className={user?.role == "Администратор" ? "" : "hide"}>Новая вакансия</button>
          <button onClick={() => {
            navigator("/jobs/company");
          }} className={user?.role == "Администратор" ? "" : "hide"}>Компании</button>
        </div>
        
      </div>

      <FilterWidget />

      <CreateVacancyWindow isCreateVacancy={isCreateVacancy} setIsCreateVacancy={setIsCreateVacancy}></CreateVacancyWindow>
    </div>
  )
}

export default JobsPage