import styles from "./index.module.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

function TopicsHeader({title, setIsCreateWindow}){

    const {user} = useContext(AuthContext);
    return(
        <header className={styles.topicsHeader}>
                <h3>{title}</h3>  
                <button onClick={() => setIsCreateWindow(true)}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                 </button>
        </header>
    ) 
} 

export default TopicsHeader;