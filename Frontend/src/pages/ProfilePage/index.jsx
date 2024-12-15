import React from 'react'
import styles from "./index.module.scss";
import avatar_image from "../../assets/images/ProfilePage/avatar.jpg";

import HeaderLoginPage from '../../components/LoginPage/Header';
import SkillItem from '../../components/ProfilePage/SkillItem';

import c_sharp from "../../assets/images/ProfilePage/skills_logo/c_sharp.png";


function ProfilePage() {
    return(
        <div className={styles.profilePage}>

            <HeaderLoginPage title={"Fealer"} />

            <div className={styles.content}>

                <div className={styles.left_content}>
                    <div className={styles.image_container}>
                        <img src={avatar_image} alt="" />
                    </div>
                    <span>Пользователь</span> {/* РОЛЬ ЧЕЛОВЕКА */}
                    
                </div>

                <div className={styles.right_content}>

                    <div className={styles.skills}>
                        <SkillItem image={c_sharp} />
                        <SkillItem image={c_sharp} />
                        <SkillItem image={c_sharp} />       
                        <SkillItem image={c_sharp} />  
                        <SkillItem image={c_sharp} />       
                        <SkillItem image={c_sharp} />     
                    </div>
                    <div className={styles.profile_statistic}>
                        <div className={styles.statistic_block}>
                            <span>0</span>
                            <span>Сообщений</span>
                        </div>

                        <div className={styles.statistic_block}>
                            <span>0</span>
                            <span>Тем создано</span>
                        </div>

                        <div className={styles.statistic_block}>
                            <span>0</span>
                            <span>Реакций</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
     
}

export default ProfilePage