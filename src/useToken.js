import { useState } from "react";

function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('accessToken')
        const userToken = JSON.parse(tokenString)
        return userToken?.access
    }
    const [token, setToken] = useState(getToken())
    const saveToken = userToken => {
        localStorage.setItem('accessToken', JSON.stringify(userToken))
        setToken(userToken?.access)
    }
    return [token, saveToken]

}
export default useToken