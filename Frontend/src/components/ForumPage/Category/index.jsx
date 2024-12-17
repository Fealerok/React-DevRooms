import React, { useEffect, useState } from 'react'

import styles from "./index.module.scss";
import Chapter from '../Chapter';

import CreateWindow from '../../CreateWindow';
const Category = ({header}) => {

  const [chapters, setChapters] = useState(null);
  const [isCreateWindow, setIsCreateWindow] = useState(false);

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


  const addNewChapter = async (chapterName) => {
    console.log(chapterName);
    const response = await fetch("http://localhost:3030/add-new-chapter", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chapterName: chapterName,
        categoryName: header
      })
    });

    if (response.ok) getChapters();
  }


  if (chapters){
    return (

      <>
        <div className={styles.category}>
          <div className={styles.category_header}>
            <span>{header}</span>
            <button onClick={() => setIsCreateWindow(true)}>
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

        <CreateWindow title={"раздела"} display={isCreateWindow} setDisplay={setIsCreateWindow} addNew={addNewChapter}/>
      </>
      
    )

  }

  else{
    return (

      <>
        <div className={styles.category}>
          <div className={styles.category_header}>
            <span>{header}</span>
            <button onClick={() => setIsCreateWindow(true)}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </button>
          </div>
          <div className={styles.category_content}>

            <div className={styles.empty_chapter}></div>


          </div>
        </div>

        <CreateWindow title={"раздела"} display={isCreateWindow} setDisplay={setIsCreateWindow} addNew={addNewChapter}/>
      </>
      
    )
  }


  
}

export default Category