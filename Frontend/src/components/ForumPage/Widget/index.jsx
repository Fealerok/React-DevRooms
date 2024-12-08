import React, { useState } from 'react'
import styles from "./index.module.scss"

import PopularContent from '../../ForumPageWidget/PopularContent';

const Widget = () => {

    const [isPopular, setIsPopular] = useState(true);
  return (
    <div className={styles.widget}>
        <div className={styles.widget_header}>
            <button 
                className={`${isPopular ? styles.active : ""}`}
                onClick={() => setIsPopular(true)}>
                    Популярное
            </button>

            <button 
                className={`${!isPopular ? styles.active : ""}`}
                onClick={() => setIsPopular(false)}>
                    Новости
            </button>
        </div>

        <div className={styles.widget_content}>
            {isPopular ? <PopularContent /> : <div>Новости</div>}
        </div>

        
    </div>
  )
}

export default Widget