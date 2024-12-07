import React, { useContext, useEffect, useState } from 'react'
import styles from "./index.module.scss";
import { Link } from 'react-router-dom';
import login_img from "../../assets/images/header/login.png";
import register_img from "../../assets/images/header/register.png";

import { AuthContext } from '../../context/authContext';
import { getTokens } from '../../localStorage';
import { use } from 'react';


const Header = () => {

  const linkStyles = {
    color: "white",
    textDecoration: "none",
    height: "100%"
  }

  const [isLogged, setIsLogged] = useState(false);
  const {user, setUser} = useContext(AuthContext);

  const [nickname, setNickname] = useState(null);


  useEffect(() => {
    setNickname(user?.login);
    setIsLogged(user?.isLogged);
  }, []);

  return (
    <div className={styles.header}>
        <div className={styles.content}>
            <div className={styles.left_content}>
              <span>DR</span>

              <div className={styles.buttons}>
                  <Link to="/" className={styles.link} style={linkStyles}>Форум</Link>
                  <Link to="/profile" className={styles.link} style={linkStyles}>Профиль</Link>
              </div>
            </div>

          {!user?.isLogged ? (
            <div className={styles.auth_links}>
            <div className={styles.container}>
              <img src={login_img} alt="" />
              <Link to="/auth" className={styles.login} style={linkStyles}>Вход</Link>
            </div>
            <div className={styles.vertical_line}></div>
            <div className={styles.container}>
              <img src={register_img} alt="" />
              <Link to="/register" className={styles.login} style={linkStyles}>Регистрация</Link>
            </div>
          </div>
          ) : (
            <div className={styles.auth_links}>
              <div className={styles.container}>
                <Link to="/profile" className={styles.login} style={linkStyles}>{user.login}</Link>
              </div>
          </div>
          )}
            

        </div>
    </div>
  )
}

export default Header