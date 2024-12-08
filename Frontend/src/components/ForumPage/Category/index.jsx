import React from 'react'

import styles from "./index.module.scss";
import Chapter from '../Chapter';

const Category = ({header}) => {
  return (
    <div className={styles.category}>
      <div className={styles.category_header}>
        <span>{header}</span>
      </div>
      <div className={styles.category_content}>
        <Chapter title={"Раздел 1"} />
        <Chapter title={"Раздел 2"} />
        <Chapter title={"Раздел 3"} />
      </div>
    </div>
  )
}

export default Category