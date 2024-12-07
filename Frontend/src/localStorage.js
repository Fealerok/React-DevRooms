const saveTokens = (accessToken, refreshToken) => {

    console.log(accessToken);
    console.log(refreshToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}


const getTokens = () => {
    return {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken")
    }
}

export {
    saveTokens,
    getTokens
}
