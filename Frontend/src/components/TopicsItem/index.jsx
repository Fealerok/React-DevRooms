import { Link } from "react-router-dom";
import styles from "./index.module.scss";

function TopicsItem({title}){
    return(
        <div className={styles.topicsItem}>
            <div>
                <div>
                    <Link>
                        <span>{title}</span>
                        <span>Автор Fealer</span>
                    </Link>
                </div>

            </div>
            
        </div>
    )
}

export default TopicsItem;