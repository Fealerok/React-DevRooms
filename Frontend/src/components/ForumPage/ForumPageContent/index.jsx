import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss";

import Category from '../Category';
import Statistic from '../Statistic';

const ForumPageContent = () => {

  const [categories, setCategories] = useState(null);

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


  if (categories) {
    return (
      <div className={styles.forum_page_content}>
        <div className={styles.categories}>
  
          {categories.map((cat, i) => (
              <Category key={i} header={cat.name} />
          ))}
        </div>
  
        <Statistic />
      </div>
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