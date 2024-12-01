import React from 'react'
import styles from "./index.module.scss";
import { Link } from 'react-router-dom';

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

            <Link to="/auth" className={styles.login} style={linkStyles}>Авторизация</Link>
        </div>
    </div>
  )
}

export default Header