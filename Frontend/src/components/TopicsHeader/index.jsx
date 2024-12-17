import styles from "./index.module.scss";

function TopicsHeader({title, setIsCreateWindow}){
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