import styles from "./index.module.scss";


function TopicsHeader({title}){
    return(
        <header className={styles.topicsHeader}>
                <h3>{title}</h3>  
        </header>
    ) 
} 

export default TopicsHeader;