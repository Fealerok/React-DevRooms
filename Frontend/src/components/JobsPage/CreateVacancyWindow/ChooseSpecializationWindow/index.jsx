import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss";

const ChooseSpecializationWindow = ({
    isChooseSpecialization,
    setIsChooseSpecialization,
    setSelectedSubspecialization
}) => {

    const [selectValue, setSelectValue] = useState([]);


    const [specializations, setSpecializations] = useState([]);
    const [subspecializations, setSubspecializations] = useState([]);

    const [selectedSpecialization, setSelectedSpecialization] = useState(null);
    const [selectedSubs, setSelectedSubs] = useState("");

    const addSpecializations = () => {
        let subs = "";
        specializations.forEach(s => {
            s.subspecializations.forEach(sub => {
                sub.isChose ? subs += `${sub.name}, ` : null;
            });
        });

        setSelectedSubspecialization(subs.trim().slice(0, -1));
        setIsChooseSpecialization(false);
        setSpecializations([]);
        setSubspecializations([]);
        setSelectedSpecialization(null);

        
    }

    const getSpecializations = async () => {
        const response = await fetch("http://localhost:3030/get-specializations", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        setSpecializations((await response.json()).nestedData);
    }
    
    const chooseSpecializationHandle = (id_specialization) => {
        specializations.forEach(s => {
            if (s.id == id_specialization){
                setSubspecializations(s.subspecializations);
                return;
            }
        });

        setSelectedSpecialization(id_specialization);
    }

    const subspecializationClickHandle = (id) => {
        setSpecializations(prevSpecs => 
            prevSpecs.map(spec => 
                spec.id === selectedSpecialization 
                    ? {
                        ...spec,
                        subspecializations: spec.subspecializations.map(sub => 
                            sub.id === id 
                                ? {...sub, isChose: !sub.isChose} 
                                : sub
                        )
                    } 
                    : spec
            )
        );
        
        setSubspecializations(prevSubs => 
            prevSubs.map(sub => 
                sub.id === id 
                    ? {...sub, isChose: !sub.isChose} 
                    : sub
            )
        );
    }

    useEffect(() => {
        if (isChooseSpecialization) getSpecializations();
    }, [isChooseSpecialization])

    useEffect(() => {
        console.log(specializations);
    }, [specializations]);

  return (
    <div className={`${!isChooseSpecialization ? styles.none : ""} ${styles.choose_specialization_window}`}>
        <header>Специализация</header>

        <div className={styles.specializations}>
            <div className={styles.left_block}>
                {specializations.map(s => (
                    <button style={s.id == selectedSpecialization ? {backgroundColor: "#f4e5fd"} : null} onClick={() => chooseSpecializationHandle(s.id)} key={s.id}>{s.name}</button>
                ))}
            </div>
            <div className={styles.right_block}>
                {
                     subspecializations.map(sub => (
                        <button key={sub.id} onClick={() => subspecializationClickHandle(sub.id)} style={sub.isChose == true ? {backgroundColor: "#f4e5fd"} : null}>{sub.name}</button>
                    ))
                }
            </div>
        </div>

        <div className={styles.buttons}>
            <button onClick={addSpecializations}>Добавить</button>
            <button onClick={() => setIsChooseSpecialization(false)}>Отменить</button>
        </div>
    </div>
  )
}

export default ChooseSpecializationWindow