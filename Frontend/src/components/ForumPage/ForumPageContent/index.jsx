import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss";

import Category from '../Category';
import Statistic from '../Statistic';
import CreateWindow from '../../CreateWindow';

const ForumPageContent = ({setBlur}) => {

  const [categories, setCategories] = useState(null);
  const [isCreateWindow, setIsCreateWindow] = useState(false);

  const getCategories = () => {
    const response = fetch("http://localhost:3030/get-categories", {
      method: "GET",
      headers:{
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(r => setCategories(r.categories));

  }

  useEffect(() => {
    getCategories();
  }, []);

  const addNewCategory = async (categoryName) => {
    const response = await fetch("http://localhost:3030/add-new-category", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        categoryName
      })
    });

    if (response.ok) getCategories();
    
  }

  const buttonClickHandle = () => {
    setIsCreateWindow(true);
    setBlur(true);
    console.log(isCreateWindow);
  }


  if (categories) {
    return (
      <>

          <div className={`${styles.forum_page_content} ${isCreateWindow ? styles.blur : ""}`}>
            <div className={styles.categories}>
      
              <div className={styles.container}>
                {categories.map((cat, i) => (
                    <Category key={i} header={cat.name} />
                ))}
              </div>

              <button onClick={buttonClickHandle}>Новая категория</button>
            </div>
      
            <Statistic />

            
          </div>

          <CreateWindow title={"категории"} display={isCreateWindow} setDisplay={setIsCreateWindow} setBlur={setBlur} addNew={addNewCategory}/>
      </>
    )
  }

  else{
    return (
      <div className={styles.forum_page_content}>
        <div className={styles.categories}>
          Категорий нет
        </div>
  
        <Statistic />
      </div>
    )
  }


}

export default ForumPageContent