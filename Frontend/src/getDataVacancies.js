const getCompanies = async () => {
    const response = await fetch("http://localhost:3030/get-companies", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return (await response.json()).companies;
}

const getQualifications = async () => {
    const response = await fetch("http://localhost:3030/get-qualifications", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return (await response.json()).qualifications;
}

const getTypesOfEmployment = async () => {
    const response = await fetch("http://localhost:3030/get-types-of-employment", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return (await response.json()).typesOfEmployment;
}

export {
    getCompanies,
    getQualifications,
    getTypesOfEmployment
}