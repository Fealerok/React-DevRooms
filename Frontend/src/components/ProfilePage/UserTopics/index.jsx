import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../../../context/authContext';
import TopicsItem from '../../topicsItem';

import styles from "./index.module.scss";

const UserTopics = () => {


  const [userTopics, setUserTopics] = useState([]);

  const {user} = useContext(AuthContext);

  const getUserTopics = async () => {
    const response = await fetch("http://localhost:3030/get-user-topics", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: user.login
      })
    })

    if (response.ok) console.log(response.json().then(r => setUserTopics(r)))
  }


  
  useEffect(() => {
    if (user?.login) getUserTopics();
  }, [user]);

  
  return (
    <div className={styles.user_topics}>
        <div className={styles.header}>
            Публикации
        </div>

        {userTopics.length == 0 ? (
            <div className={styles.topics}>
              Публикаций нет
            </div>
        ) : (
            <div className={styles.topics}>
              {userTopics.map((t, i) => (
                <TopicsItem key={i} topicId={t.id} title={t.name} nicknameCreator={t.nickname} />
              )) }
            </div>
        ) }
    </div>
  )
}

export default UserTopics