import React, { useEffect, useState } from 'react'

import styles from "./index.module.scss";
import Chapter from '../Chapter';

const Category = ({header}) => {

  const [chapters, setChapters] = useState(null);
  

  const getChapters = async () => {
    const response = await fetch("http://localhost:3030/get-chapters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        category_name: header
      })
    })
    .then(resp => resp.json())
    .then(r => setChapters(r));
  }

  useEffect(() => {
    getChapters();
  }, []);


  const addNewChapter = () => {

  }


  if (chapters){
    return (
      <div className={styles.category}>
        <div className={styles.category_header}>
          <span>{header}</span>
          <button>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </button>
        </div>
        <div className={styles.category_content}>

          {chapters.map((c, i) => (
            <Chapter key={i} title={c.name} chapterId={c.id} />
          ))}


        </div>
      </div>
    )

  }

  else{
    return (
      <div className={styles.category}>
        <div className={styles.category_header}>
          <span>{header}</span>
          <button>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </button>
        </div>
        <div className={styles.category_content}>

          
          Категория пустая

        </div>
      </div>
    )
  }
  
}

export default Category