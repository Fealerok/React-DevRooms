import React from 'react'
import { Link } from 'react-router-dom'

import styles from "./index.module.scss"

const Chapter = ({title, chapterId}) => {
  return (
    <Link to={`/chapter/${chapterId}`} className={styles.chapter} > {title} </Link>
  )
}

export default Chapter