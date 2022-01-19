import { useState } from "react";

function useUser() {
    const getUser = () => {
        const userItem = localStorage.getItem('user')
        const user = JSON.parse(userItem)
        return user
    }

    const [user, setUser] = useState(getUser())

    const saveUser = async token => {

        const res = await fetch('http://localhost:8000/api/get_user_detail/', {
            method: 'get',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token?.access}`
            }
        })
        const data = await res.json()

        const username = data?.username
        const accessToken = token?.access
        const refreshToken = token?.access
        const user = JSON.stringify({ username, accessToken, refreshToken })
        localStorage.setItem('user', user)
        setUser(user)
    }


    return [user, saveUser]
}

export default useUser