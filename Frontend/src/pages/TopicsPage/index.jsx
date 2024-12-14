import React from 'react'
import styles from "./index.module.scss";
import TopicsHeader from '../../components/topicsHeader';
import TopicsItem from '../../components/topicsItem';

import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';


function TopicsPage(){

    const {idChapter} = useParams();

    const [topicsInChapter, setTopicsInChapter] = useState([]);
    const [nameOfChapter, setNameOfChapter] = useState();

    const getTopicsInChapter = () => {
      const response = fetch("http://localhost:3030/get-topics-in-chapter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({chapterId: idChapter})
      })
        .then(resp => resp.json())
        .then(r => {
          
          setTopicsInChapter(r.topics);
          setNameOfChapter(r.nameOfChapter.name);
        });
    }

    useEffect(() => {
      getTopicsInChapter();
      
    }, []);


    if (topicsInChapter.length !== 0){
        return(
          <div className={styles.topicsCard}>
            <TopicsHeader title={nameOfChapter} /> 
            {topicsInChapter.map((t, i) => (
              <TopicsItem key={i} title={t.name} topicId={t.id} />
            ))}
          </div>

        )
      }
  
      else{
        return(
          <div className={styles.topicsCard}>
            <TopicsHeader title={nameOfChapter} /> 
          </div>
        )
      }

}

export default TopicsPage;