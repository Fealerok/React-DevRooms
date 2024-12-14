import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss"
import { useParams } from 'react-router-dom'
import Input from '../../components/Input'
import arrow from "../../assets/images/ButtonMessage/arrow.png";

const TopicAnswersPage = () => {

  const {idTopic} = useParams();
  const [answers, setAnswers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const getTopicAnswers = () => {
    const response = fetch("http://localhost:3030/get-topic-answers", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idTopic: idTopic
      })
    });
  }

  const getInputValue = (value) => {
    setInputValue(value);
  }

  useEffect(() => {
    getTopicAnswers();
  }, []);

  if (answers.length == 0){
    return (
      <div className={styles.topic_asnwers_page}>
        <div className={styles.content}>

            <div className={styles.header}>
              <span>Концепт Тема Тема Тема</span>
              <span>Автор Fealer</span>
            </div>
        </div>

        <div className={styles.input_container}>
          <Input title={"Введите сообщение:"} type="text" getInputValue={setInputValue} isMessage={true}></Input>
          <button>
            <img src={arrow} alt="" />
          </button>
        </div>
        
      </div>
    )
  }
  
}

export default TopicAnswersPage