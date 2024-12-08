import React from 'react'

import styles from "./index.module.scss"

const Chapter = ({title}) => {
  return (
    <div className={styles.chapter}>{title}</div>
  )
}

export default Chapter