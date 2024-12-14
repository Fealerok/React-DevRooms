import React, { useContext, useEffect, useState } from 'react'
import styles from "./index.module.scss"
import { useParams } from 'react-router-dom'
import Input from '../../components/Input'
import arrow from "../../assets/images/ButtonMessage/arrow.png";
import { AuthContext } from '../../context/authContext';

import AnswerItem from '../../components/TopicAnsersPage/AnswerItem';

const TopicAnswersPage = () => {

  const {idTopic} = useParams();
  const [pageData, setPageData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const {user} = useContext(AuthContext);

  const getTopicAnswers = () => {
    const response = fetch("http://localhost:3030/get-topic-answers", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idTopic: idTopic
      })
    })
      .then(resp => resp.json())
      .then(r => setPageData(r));

  }


  const addNewAnswer = async () => {
    const response = await fetch("http://localhost:3030/add-new-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: inputValue,
        idCreator: user.id,
        idTopic: idTopic
      })
    });


    if (response.ok) getTopicAnswers();

    

  }

  useEffect(() => {
    getTopicAnswers();
    
  }, []);


  if (pageData.length != 0){
    return (
      <div className={styles.topic_asnwers_page}>
        <div className={styles.content}>
            <div className={styles.header}>
              <span>{pageData.titleTopic}</span>
              <span>Автор {pageData.nameOfCreator}</span>
            </div>

            {pageData.answers.map((answer, i) => (
              <AnswerItem nicknameOfCreator={answer.name_creator} answer_text={answer.text_answer} key={i} />
            ))}
        </div>

        <div className={styles.input_container}>
          <Input title={"Введите сообщение:"} type="text" getInputValue={setInputValue} isMessage={true}></Input>
          <button onClick={() => addNewAnswer()}>
            <img src={arrow} alt="" />
          </button>
        </div>
        
      </div>
    )
  }
  
}

export default TopicAnswersPage