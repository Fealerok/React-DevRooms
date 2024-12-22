import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { useEffect } from "react";

function TopicsItem({title, topicId, nicknameCreator, valueOfMessages}){
    useEffect(() => {
        console.log(valueOfMessages);
    }, []);
    return(
        <div className={styles.topicsItem}>
            {!valueOfMessages ? (
                <Link to={`/topic/${topicId}`}>
                <span>{title}</span>
                <span>Автор {nicknameCreator}</span>
            </Link>
            ) : (
                <Link to={`/topic/${topicId}`}>
                    <div className={styles.container}>
                         <span>{title}</span>
                         <span>Ответов - {valueOfMessages}</span>
                    </div>
                        <span>Автор {nicknameCreator}</span>
                    </Link>
            )}

            
        </div>
    )
}

export default TopicsItem;