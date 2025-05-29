import React, { useState } from 'react'
import styles from "./index.module.scss";
import CustomSelect from '../../CustomSelect';

const FilterWidget = () => {
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
  return (
    <div className={styles.filter_widget}>
      <div className={styles.select_container}>
        <CustomSelect header={filters[0].header}
          options={filters[0].options}
          isCreateWindow={false}
          selectedDisabledOption={filters[0].disabledOption} />

        <CustomSelect header={filters[1].header}
          options={filters[1].options}
          isCreateWindow={false}
          selectedDisabledOption={filters[1].disabledOption} />

          <div className={styles.salary_container}>
            <span>Зарплата</span>
            <div className={styles.salary}>
              <input type="text" placeholder='От'/>
              <span>рублей</span>
            </div>
            
          </div>

          <div className={styles.city_container}>
            <span>Местоположение</span>
            <input type="text" placeholder='Введите город или страну'/>
          </div>

          <CustomSelect header={filters[2].header}
          options={filters[2].options}
          isCreateWindow={false}
          selectedDisabledOption={filters[2].disabledOption} />


      </div>

      <div className={styles.filter_buttons}>
        <button>Применить</button>
        <button>Сбросить</button>
      </div>
    </div>
  )
}

export default FilterWidget