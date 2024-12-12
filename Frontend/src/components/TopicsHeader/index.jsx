import styles from "./index.module.scss";


function TopicsHeader({title}){
    return(
        <header className={styles.topicsHeader}>
            <div>
                <h3>{title}</h3>  
            </div>
        </header>
    ) 
} 

export default TopicsHeader;