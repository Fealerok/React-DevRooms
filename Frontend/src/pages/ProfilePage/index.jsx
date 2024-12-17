import React, { useContext, useEffect } from 'react'
import styles from "./index.module.scss";
import avatar_image from "../../assets/images/ProfilePage/avatar.jpg";

import HeaderLoginPage from '../../components/LoginPage/Header';
import SkillItem from '../../components/ProfilePage/SkillItem';
import UserTopics from '../../components/ProfilePage/UserTopics';
import { AuthContext } from '../../context/authContext';

import c_sharp from "../../assets/images/ProfilePage/skills_logo/c_sharp.png";
import css from "../../assets/images/ProfilePage/skills_logo/css.png";
import react from "../../assets/images/ProfilePage/skills_logo/react.png";
import c_plus from "../../assets/images/ProfilePage/skills_logo/c_plus.png";
import js from "../../assets/images/ProfilePage/skills_logo/js.png";
import python from "../../assets/images/ProfilePage/skills_logo/python.png";


function ProfilePage() {

    const {user} = useContext(AuthContext);

    const getProfileStatistic = () => {
        const response = fetch("http://localhost:3030/get-profile-statistic", {
             
        });
    }


    return(
        <div className={styles.profilePage}>

            <div className={styles.profile_container}>
                <HeaderLoginPage title={user?.login} />

                <div className={styles.content}>

                    <div className={styles.left_content}>
                        <div className={styles.image_container}>
                            <img src={avatar_image} alt="" />
                        </div>
                        <span>{user?.role}</span> {/* РОЛЬ ЧЕЛОВЕКА */}
                        
                    </div>

                    <div className={styles.right_content}>

                        <div className={styles.skills}>
                            <SkillItem image={c_sharp} title={"C#"} />
                            <SkillItem image={css} title={"CSS"} />
                            <SkillItem image={react} title={"React"}/>       
                            <SkillItem image={c_plus} title={"C++"}/>  
                            <SkillItem image={js} title={"JavaScript"}/>       
                            <SkillItem image={python} title={"Python"}/>     
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

            <UserTopics></UserTopics>

        </div>
    )
     
}

export default ProfilePage