import React from 'react'
import styles from "./index.module.scss"

import avatar from "../../../assets/images/ProfilePage/avatar.jpg";

const AnswerItem = ({answer_text, nicknameOfCreator}) => {
  return (
    <div className={styles.answer_item}>
        <div className={styles.header}>
            <div>
              <img src={avatar} alt="" />
            </div>
            <span>{nicknameOfCreator}</span>
        </div>

        <div className={styles.answer_text_container}>
            <span>{answer_text}</span>
        </div>
    </div>
  )
}

export default AnswerItem