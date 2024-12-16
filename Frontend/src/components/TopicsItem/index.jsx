import { Link } from "react-router-dom";
import styles from "./index.module.scss";

function TopicsItem({title, topicId, nicknameCreator}){
    return(
        <div className={styles.topicsItem}>
                    <Link to={`/topic/${topicId}`}>
                        <span>{title}</span>
                        <span>Автор {nicknameCreator}</span>
                    </Link>
            
        </div>
    )
}

export default TopicsItem;