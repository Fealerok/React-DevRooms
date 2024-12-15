import React from 'react'
import styles from "./index.module.scss";

const SkillItem = ({image}) => {
  return (
    <div className={styles.skill_item}>
        <span>C#</span>
        <div className={styles.image_container}>
            <img src={image} alt="" />
        </div>

        <div className={styles.skill_levels}>
            <div className={styles.level}></div>
            <div className={styles.level}></div>
            <div className={styles.level}></div>
            
        </div>
    </div>
  )
}

export default SkillItem