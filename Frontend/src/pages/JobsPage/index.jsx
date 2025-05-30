import React, { useContext, useEffect, useState } from 'react'
import styles from "./index.module.scss"
import SearchWidget from '../../components/JobsPage/SearchWidget'
import FilterWidget from '../../components/JobsPage/FilterWidget'
import Vacancy from '../../components/JobsPage/Vacancy'
import { AuthContext } from '../../context/authContext'
import CreateVacancyWindow from '../../components/JobsPage/CreateVacancyWindow'
import { useNavigate } from 'react-router-dom'
import ChooseSpecializationWindow from '../../components/JobsPage/CreateVacancyWindow/ChooseSpecializationWindow'


const JobsPage = () => {

  const {user} = useContext(AuthContext);
  const [isCreateVacancy, setIsCreateVacancy] = useState(false);
  const [isCreateCompany, setIsCreateCompany] = useState(false);

  const [allVacancies, setAllVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);

  const [sortType, setSortType] = useState("");

  const [selectedSpecializations, setSelectedSpecializations] = useState("");
  const [selectedQualification, setSelectedQualification] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTypeOfEmployment, setSelectedTypeOfEmployment] = useState("");

  const [isChooseSpecializations, setIsChooseSpecializations] = useState(false);

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

  const applySort = () => {
    if (sortType == "По возрастанию ЗП"){
      const sorted = [...filteredVacancies].sort((a, b) => Number(b.salary) - Number(a.salary));
      setFilteredVacancies(sorted);
      return;
    }

    if (sortType == "По убыванию ЗП"){
      const sorted = [...filteredVacancies].sort((a, b) => Number(a.salary) - Number(b.salary));
      setFilteredVacancies(sorted);
      return;
    }
  }

  const applyFilters = () => {
    const filtered = allVacancies.filter(vacancy => {
      // Проверка квалификации (если фильтр задан)
      const qualificationMatch = selectedQualification === "" || 
                               vacancy.name_qualification === selectedQualification;
      
      // Проверка зарплаты (если фильтр задан)
      const salaryMatch = selectedSalary === "" || 
                         Number(vacancy.salary) >= Number(selectedSalary);
      
      // Проверка местоположения (если фильтр задан)
      const locationMatch = selectedLocation === "" || 
                           vacancy.location === selectedLocation;
      
      // Проверка типа занятости (если фильтр задан)
      const employmentMatch = selectedTypeOfEmployment === "" || 
                            vacancy.name_typeofemployment === selectedTypeOfEmployment;
      
       // 1. Разбиваем выбранные специализации на массив
    const selectedSpecsArray = selectedSpecializations
    .split(', ')
    .map(spec => spec.trim());
  
  // 2. Проверяем, есть ли у вакансии хотя бы одна из выбранных специализаций
  const specializationPass = selectedSpecializations === "" || 
    (vacancy.specializations && 
     selectedSpecsArray.some(selectedSpec => 
       vacancy.specializations.includes(selectedSpec)
     ));
  
      // Все условия должны выполняться одновременно
      return qualificationMatch && salaryMatch && locationMatch && 
             employmentMatch && specializationPass;
    });
  
    setFilteredVacancies(filtered);
  };

  const searchHandle = (searchValue) => {

    if (!searchValue || searchValue == ""){
      setFilteredVacancies(allVacancies);
      return
    }
    
    const filtered = filteredVacancies.filter(v => v.name_company.includes(searchValue) || 
                                                    v.name_vacancy.includes(searchValue) ||
                                                    v.name_typeofemployment.includes(searchValue) || 
                                                    v.name_qualification.includes(searchValue) ||
                                                    v.specializations.includes(searchValue) ||
                                                    v.salary.includes(searchValue) ||
                                                    v.location.includes(searchValue))

    setFilteredVacancies(filtered);
  };

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

  useEffect(() => {
   applySort();
  }, [sortType]);

  return (
    <div className={styles.jobs_page}>
      <div className={styles.jobs_page_content}>
        <SearchWidget searchFunc={searchHandle} setSortType={setSortType} foundedVacanciesCount={vacanciesCount} />
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

      <FilterWidget
      setSelectedSpecializations={setSelectedSpecializations}
      setSelectedQualification={setSelectedQualification}
      setSelectedSalary={setSelectedSalary}
      setSelectedLocation={setSelectedLocation}
      setSelectedTypeOfEmployment={setSelectedTypeOfEmployment}
      setIsChooseSpecializations={setIsChooseSpecializations}
      specializations={selectedSpecializations}
      applyFilters={applyFilters} />

      <CreateVacancyWindow isCreateVacancy={isCreateVacancy} setIsCreateVacancy={setIsCreateVacancy}></CreateVacancyWindow>
      <ChooseSpecializationWindow isChooseSpecialization={isChooseSpecializations} setIsChooseSpecialization={setIsChooseSpecializations} setSelectedSubspecialization={setSelectedSpecializations} />
    </div>
  )
}

export default JobsPage