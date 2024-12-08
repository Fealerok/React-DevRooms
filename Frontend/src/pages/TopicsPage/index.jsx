import React from 'react'
import styles from "./index.module.scss";
import TopicsHeader from '../../components/topicsHeader';
import TopicsItem from '../../components/topicsItem';


function TopicsPage(){
    return(
        <div className={styles.topicsCard}>

         <TopicsHeader />   
            <div>
                <TopicsItem />
                <TopicsItem />
                <TopicsItem />
                <TopicsItem />
                <TopicsItem />
                <TopicsItem />
            </div>
        </div>
    )
}

export default TopicsPage;