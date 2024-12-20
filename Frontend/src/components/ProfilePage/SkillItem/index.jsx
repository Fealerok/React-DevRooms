import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss";

const SkillItem = ({image, title, level}) => {

  const [color, setColor] = useState("");

  useEffect(() => {
    switch(level){
      case 1: 
        setColor("red");
        break;
        case 2: 
        setColor("orange");
        break;
        case 3: 
        setColor("green");
        break;
    }
  }, []);
  
  return (
    <div className={styles.skill_item}>
        <span>{title}</span>
        <div className={styles.image_container}>
            <img src={image} alt="" />
        </div>

        <div className={styles.skill_levels}>

          {Array.from({length: 3}).map((_, i) => (
            <div key={i} className={`${styles.level} ${i < level ? color : ""}`}></div>
          ))}
            
        </div>
    </div>
  )
}

export default SkillItem