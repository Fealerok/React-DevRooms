import React from 'react'
import styles from "./index.module.scss";
<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>

function ProfilePage() {
    return(
        <div className={styles.profilePage}>

            <div className={styles.profileCard}>

                <header className={styles.profileCardHeader}>
                    <span>Fotinoki23</span>
                </header>
                
                <div className={styles.userInfo}>

                    <div className={styles.avatarNickname}>

                        <div className={styles.userAvatar}>
                            <img className={styles.img} src="https://99px.ru/sstorage/86/2023/09/mid_42079_970304.jpg" alt="" /> 
                        </div>
                        
                        <p>Bosko</p>

                    </div>

                    <div className={styles.userStat}>
                        <div className={styles.userSkils}>
                            <div className={styles.skillBox}>
                                
                                    <span>CSS</span>
                                    <div className={styles.wrapperImg}>
                                        <img className={styles.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqks6bkM4tTJy69jDFqLrsOj9gRphGaB8Deg&s" alt="" />
                                    </div>
                                    
                                    <div className={styles.progressBar}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                            
                            </div>
                            <div className={styles.skillBox}>
                                
                                    <span>CSS</span>
                                    <div className={styles.wrapperImg}>
                                        <img className={styles.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqks6bkM4tTJy69jDFqLrsOj9gRphGaB8Deg&s" alt="" />
                                    </div>
                                    
                                    <div className={styles.progressBar}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                            
                            </div>
                            <div className={styles.skillBox}>
                                
                                    <span>CSS</span>
                                    <div className={styles.wrapperImg}>
                                        <img className={styles.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqks6bkM4tTJy69jDFqLrsOj9gRphGaB8Deg&s" alt="" />
                                    </div>
                                    
                                    <div className={styles.progressBar}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                            
                            </div>
                            <div className={styles.skillBox}>
                                
                                    <span>CSS</span>
                                    <div className={styles.wrapperImg}>
                                        <img className={styles.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqks6bkM4tTJy69jDFqLrsOj9gRphGaB8Deg&s" alt="" />
                                    </div>
                                    
                                    <div className={styles.progressBar}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                            
                            </div>
                            <div className={styles.skillBox}>
                                
                                    <span>CSS</span>
                                    <div className={styles.wrapperImg}>
                                        <img className={styles.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqks6bkM4tTJy69jDFqLrsOj9gRphGaB8Deg&s" alt="" />
                                    </div>
                                    
                                    <div className={styles.progressBar}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                            
                            </div>
                            <div className={styles.skillBox}>
                                
                                <span>CSS</span>
                                <div className={styles.wrapperImg}>
                                    <img className={styles.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqks6bkM4tTJy69jDFqLrsOj9gRphGaB8Deg&s" alt="" />
                                </div>
                                    
                                <div className={styles.progressBar}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            
                            </div>
                        </div>  

                        <div className={styles.statisticsBox}>
                            <div>
                                <span>Сообщений</span>
                                <span>0</span>
                            </div>
                            <div>
                                <span>Тем Создано</span>
                                <span>0</span>
                            </div>
                            <div>
                                <span>Реакций</span>
                                <span>0</span>
                            </div>
                        </div>

                    </div>
                    
                </div>
                

            </div>

            <div className={styles.profileCard}>
            
            </div>

        </div>
    )
     
}

export default ProfilePage