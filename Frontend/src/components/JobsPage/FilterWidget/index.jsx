import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss";
import CustomSelect from '../../CustomSelect';


const FilterWidget = ({
  setSelectedSpecializations,
  setSelectedQualification,
  setSelectedSalary,
  setSelectedLocation,
  setSelectedTypeOfEmployment,
  setIsChooseSpecializations,
  specializations,
  applyFilters
}) => {

  const [qualifications, setQualifications] = useState("");
  const [typesOfEmployment, setTypesOfEmployment] = useState("");

  const [filters, setFilters] = useState([
    {
      id: 1,
      header: "Специализация",
      options: ["Веб-разработчик", "Разработчик игр", "Мобильная разработка", "Кабербезопасность", "Разработка ПО"],
      disabledOption: "Выберите специализацию"
    },
    {
      id: 2,
      header: "Квалификация",
      options: ["Junior", "Middle", "Senior", "TeamLead"],
      disabledOption: "Выберите квалификацию"
    },
    {
      id: 3,
      header: "Тип занятости",
      options: ["Полная занятость", "Частичная занятость", "Удалённая работа"],
      disabledOption: "Выберите тип занятости"
    }
  ]);

  useEffect(() => {
    setSelectedQualification(qualifications);
  }, [qualifications]);

  useEffect(() => {
   setSelectedTypeOfEmployment(typesOfEmployment);
  }, [typesOfEmployment]);

  return (
    <div className={styles.filter_widget}>
      <div className={styles.select_container}>

        <div className={styles.choose_specialization}>
          <span>Специализация</span>
          <div className={styles.specialization_div}
            onClick={() => setIsChooseSpecializations(true)}>
            <span>{specializations == "" ? "Выберите специализации" : specializations}</span>
          </div>
        </div>

        <CustomSelect header={filters[1].header}
          options={filters[1].options}
          isCreateWindow={false}
          selectedDisabledOption={filters[1].disabledOption}
          setValue={setQualifications} />

          <div className={styles.salary_container}>
            <span>Зарплата</span>
            <div className={styles.salary}>
              <input type="text" placeholder='От' onChange={(e) => setSelectedSalary(e.target.value)}/>
              <span>рублей</span>
            </div>
            
          </div>

          <div className={styles.city_container}>
            <span>Местоположение</span>
            <input type="text" placeholder='Введите город или страну' onChange={(e) => setSelectedLocation(e.target.value)}/>
          </div>

          <CustomSelect header={filters[2].header}
          options={filters[2].options}
          isCreateWindow={false}
          selectedDisabledOption={filters[2].disabledOption}
          setValue={setTypesOfEmployment} />


      </div>

      <div className={styles.filter_buttons}>
        <button  onClick={() => applyFilters()}>Применить</button>
        <button onClick={() => parent.location.reload()}>Сбросить</button>
      </div>
    </div>
  )
}

export default FilterWidget