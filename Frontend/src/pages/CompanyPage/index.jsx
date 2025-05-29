import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss"

import CreateCompanyWindow from '../../components/JobsPage/CreateCompanyWindow';
import NewVacancies from '../../components/JobsPage/NewVacancies';
import CompanyItem from '../../components/CompanyPage/CompanyItem';

const CompanyPage = () => {

    const [isCreateCompany, setIsCreateCompany] = useState(false);
    const [companies, setCompanies] = useState([]);

    const updateCompanyList = async () => {
      const response = await fetch("http://localhost:3030/get-companies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      setCompanies((await response.json()).companies);
    }

    useEffect(() => {
      updateCompanyList();
    }, []);

    useEffect(() => {
      updateCompanyList();
    }, [isCreateCompany]);


  return (
    <div className={styles.company_page}>
        
        <div className={styles.container}>


            <div className={styles.company_list}>
                {companies?.length != 0 ? (
                 companies.map((company) => (
                  <CompanyItem
                  key={company.id}
                  id={company.id}
                  name={company.name}
                  description={company.description}
                  updateCompanyList={updateCompanyList} />
                 ))
                ) : (
                  <span style={{textAlign: "center"}}>Список компаний пуст.</span>
                )}

                <button onClick={() => setIsCreateCompany(true)}>Новая компания</button>
            </div>
            <NewVacancies/>
        </div>

        <CreateCompanyWindow isCreateCompany={isCreateCompany} setIsCreateCompany={setIsCreateCompany}/>
    </div>
  )
}

export default CompanyPage