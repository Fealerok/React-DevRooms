import styles from "./App.module.scss";
import { Link } from "react-router-dom";
import AuthContext from "./context/authContext";
import { useContext, useEffect, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Routes, Route } from "react-router-dom";
import ForumPage from "./pages/ForumPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

function App() {

  const {isLogged, setIsLogged} = useContext(AuthContext);

  
  return (
    <div className={styles.app}>
      <Header />

      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<ForumPage />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Routes>
      </div>
      
      <Footer />
    </div>
  )

  
}

export default App
