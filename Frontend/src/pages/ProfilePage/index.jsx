import React, { useContext, useEffect, useState } from 'react'
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
import { useParams } from 'react-router-dom';


function ProfilePage() {

    const {user} = useContext(AuthContext);
    const {nicknameProfile} = useParams();
    const [imagesSkills, setImagesSkills] = useState([c_sharp, c_plus, css, react, python, js]);

    const [profileStatistic, setProfileStatistic] = useState({});

    const getProfileStatistic = async () => {
        const response = await fetch("http://localhost:3030/get-profile-statistic", {
             method: "POST",
             headers:{
                "Content-Type":"application/json"
             },
             body: JSON.stringify({
                nicknameProfile
             })
        });

        if (response.ok) response.json().then(r => {
            setProfileStatistic(r);
        });


    }

    useEffect(() => {
        if (nicknameProfile) getProfileStatistic();
    }, []);

    if (profileStatistic.skills ){

        return(
            <div className={styles.profilePage}>
    
                <div className={styles.profile_container}>
                    <HeaderLoginPage title={profileStatistic.nickname} />
    
                    <div className={styles.content}>
    
                        <div className={styles.left_content}>
                            <div className={styles.image_container}>
                                <img src={avatar_image} alt="" />
                            </div>
                            <span>{profileStatistic.role_name}</span> {/* РОЛЬ ЧЕЛОВЕКА */}
                            
                        </div>
    
                        <div className={styles.right_content}>
    
                            <div className={styles.skills}>
    
                                {Object.keys(profileStatistic.skills).map((key, i) => (
                                    <SkillItem key={i} image={imagesSkills[i]} title={key} level={profileStatistic.skills[key]}></SkillItem>
                                ))}


                                   
             
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
}

export default ProfilePage