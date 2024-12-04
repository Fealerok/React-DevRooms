import React from 'react'
import styles from "./index.module.scss";
import { Link } from 'react-router-dom';
import login_img from "../../assets/images/header/login.png";
import register_img from "../../assets/images/header/register.png";

const Header = () => {

  const linkStyles = {
    color: "white",
    textDecoration: "none",
    height: "100%"
  }

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

        </div>
    </div>
  )
}

export default Header