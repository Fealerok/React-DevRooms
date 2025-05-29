import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss"

const CreateCompanyWindow = ({
    isCreateCompany,
    setIsCreateCompany
}) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const createCompany = async () => {
        if (name.trim() == "" ) {
            alert("Необходимо ввести название компании.");
            return;
        }

        const response = await fetch("http://localhost:3030/add-company", {
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              nameCompany: name,
              descriptionCompany: description
            })
          });
      
          setIsCreateCompany(false);

      
    }

    useEffect(() => {
        console.log(description);
    }, [description]);

  return (
    <div className={`${styles.create_company_window} ${!isCreateCompany ? styles.none : ""}`}>
        <header>Создание компании</header>

        <div className={styles.inputs}>
            <div className={styles.name}>
                <span>Введите название компании:</span>
                <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>

            <div className={styles.desctiption}>
                <span>Введите краткое описание компании:</span>
                <textarea  name="" id="" onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
        </div>

        <div className={styles.buttons}>
            <button onClick={createCompany}>Создать</button>
            <button onClick={() => setIsCreateCompany(false)}>Отменить</button>
        </div>
    </div>
  )
}

export default CreateCompanyWindow