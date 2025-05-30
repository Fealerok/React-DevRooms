import React, { useState } from 'react'
import styles from "./index.module.scss"
import Input from '../../Input'
import search_img from "../../../assets/images/TopicsPage/search.png";

const SearchWidget = ({
  foundedVacanciesCount,
  setSortType,
  searchFunc
}) => {

  const [sortSelectValue, setSortSelectValue] = useState("Сортировка:");
  const [searchValue, setSearchValue] = useState();

  const selectValueChangeHandle = (e) => {
    setSortSelectValue(e.target.value);
    setSortType(e.target.value);
  }

  const searchButtonClick = () => {
    searchFunc(searchValue);
  }

  return (
    <div className={styles.search_widget}> 
        <header>Работа и вакансии</header>

        <div className={styles.widget_content}>
            <div className={styles.search}>
                <input type="text" placeholder='Поиск' onChange={(e) => setSearchValue(e.target.value)} />
                  <button onClick={searchButtonClick}>
                      <img src={search_img} alt="" />
                  </button>
            </div>

            <div className={styles.select_container}>
                <select value={sortSelectValue}
                onChange={selectValueChangeHandle}>
                  <option selected disabled>Сортировка:</option>
                  <option>По возрастанию ЗП</option>
                  <option>По убыванию ЗП</option>
                </select>
                <span>Найдено {foundedVacanciesCount} вакансий</span>
            </div>
        </div>
    </div>
  )
}

export default SearchWidget