import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss"
import CustomSelectVacancy from "../../JobsPage/CustomSelect/index";
import ChooseSpecializationWindow from './ChooseSpecializationWindow';

import { getCompanies, getQualifications, getTypesOfEmployment } from '../../../getDataVacancies'

const CreateVacancyWindow = ({
  isCreateVacancy,
  setIsCreateVacancy
}) => {

  const [companies, setCompanies] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [typesOfEmployment, setTypesOfEmployment] = useState([]);

  const [isChooseSpecialization, setIsChooseSpecialization] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedQualification, setSelectedQualification] = useState("");
  const [selectedSubspecializations, setSelectedSubspecialization] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTypeOfEmployment, setSelectedTypeOfEmployment] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");

  const createVacancy = async () => {


    if (selectedCompany == "" || selectedCompany == "компании"){
      alert("Для создания вакансии необходимо выбрать компанию.");
      return;
    }

    if (selectedName == ""){
      alert("Для создания вакансии необходимо выбрать название вакансии.");
      return;
    }

    if (selectedQualification == "" || selectedQualification == "квалификации"){
      alert("Для создания вакансии необходимо выбрать квалификацию.");
      return;
    }

    if (selectedSubspecializations == ""){
      alert("Для создания вакансии необходимо выбрать специализации.");
      return;
    }

    if (selectedSalary == ""){
      alert("Для создания вакансии необходимо выбрать зарплату.");
      return;
    }

    if (selectedLocation == ""){
      alert("Для создания вакансии необходимо выбрать местоположение.");
      return;
    }

    if (selectedTypeOfEmployment == "" || selectedTypeOfEmployment == "тип занятости"){
      alert("Для создания вакансии необходимо выбрать тип занятости.");
      return;
    }

    if (phone == ""){
      alert("Для создания вакансии необходимо написать телефон для связи.");
      return;
    }

    const createdVacancy = {
      selectedCompany,
      selectedName,
      selectedQualification,
      selectedSubspecializations,
      selectedSalary,
      selectedLocation,
      selectedTypeOfEmployment,
      description,
      phone
    }

    const response = await fetch("http://localhost:3030/add-vacancy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({createdVacancy})
    });
  
    

    setIsCreateVacancy(false);
    location.reload();
  }

  const getData = async () => {
    console.log(await getQualifications());
    setCompanies(await getCompanies());
    setQualifications(await getQualifications());
    setTypesOfEmployment(await getTypesOfEmployment());
  }

  useEffect(() => {
    if (isCreateVacancy) getData();
  }, [isCreateVacancy]);

  useEffect(() => {
    console.log(selectedCompany);
  }, [selectedCompany]);




  return (
    <div className={`${isCreateVacancy ? styles.display : styles.none} ${styles.create_vacancy_window}`}>
      <header>Создание вакансии</header>

      <div className={styles.vacancy_info_container}>
        <div className={styles.left_inputs}>

          <CustomSelectVacancy header={"Название компании:"}
            options={companies}
            isCreateWindow={true}
            selectedDisabledOption={"компании"}
            setValue={setSelectedCompany} />

          <div className={styles.input_container}>
            <span>Название вакансии:</span>
            <input type="text" placeholder='' onChange={(e) => setSelectedName(e.target.value)} />
          </div>

          <CustomSelectVacancy header={"Выберите квалификацию:"}
            options={qualifications}
            isCreateWindow={true}
            selectedDisabledOption={"квалификации"}
            setValue={setSelectedQualification} />

            <div className={styles.choose_specialization}>
              <span>Выберите специализацию:</span>
              <div className={styles.specialization_div}
              onClick={() => setIsChooseSpecialization(true)}>
                <span>{selectedSubspecializations}</span>
              </div>
            </div>

        </div>


        <div className={styles.right_inputs}>

          <div className={styles.input_container}>
            <span>Введите зарплату:</span>
            <input type="text" placeholder='' onChange={(e) => setSelectedSalary(e.target.value)} />
          </div>

          <div className={styles.input_container}>
            <span>Введите местоположение:</span>
            <input type="text" placeholder='' onChange={(e) => setSelectedLocation(e.target.value)} />
          </div>

          <CustomSelectVacancy header={"Тип занятости:"}
            options={typesOfEmployment}
            isCreateWindow={true}
            selectedDisabledOption={"тип занятости"}
            setValue={setSelectedTypeOfEmployment} />

          <div className={styles.input_container}>
            <span>Введите номер телефона:</span>
            <input type="text" placeholder='' onChange={(e) => setPhone(e.target.value)} />
          </div>

        </div>

      </div>

      <div className={styles.description_container}>
        <span>Описание:</span>
        <textarea name="" id="" onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>

      <div className={styles.buttons}>
        <button onClick={createVacancy}>Создать</button>
        <button onClick={() => setIsCreateVacancy(false)}>Отменить</button>
      </div>

      <ChooseSpecializationWindow setSelectedSubspecialization={setSelectedSubspecialization} isChooseSpecialization={isChooseSpecialization} setIsChooseSpecialization={setIsChooseSpecialization} />
    </div>
  )
}

export default CreateVacancyWindow