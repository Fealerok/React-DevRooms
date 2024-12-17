import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss";

import Widget from '../../components/ForumPage/Widget';
import ForumPageContent from '../../components/ForumPage/ForumPageContent';
import CreateWindow from '../../components/CreateWindow';

const ForumPage = () => {

  const [isBlur, setIsBlur] = useState(false);

  return (
    <div className={`${styles.forumPage}`}>
      <Widget isBlur={isBlur} />
      <ForumPageContent setBlur = {setIsBlur} />
    </div>
  )
}

export default ForumPage