// import { register, handleSubmit } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useContext } from 'react'
import tokenContext from '../tokenContext'
import ClassCards from './ClassFolder/ClassCards'
const fetchClasses = async (token) => {
    const authToken = `Bearer ${token}`
    const res = await fetch('http://localhost:8000/api/v1/group/', {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': authToken,
        }
    })
    return res.json()
}
function Home() {
    const { token } = useContext(tokenContext)
    const { data, isLoading } = useQuery('getClassList', () => fetchClasses(token), {
        refetchOnWindowFocus: false
    })
    if (isLoading) {
        return <h1>Loading</h1>
    }
    return (
        <div>
            {data.map((group, index) => {
                return <ClassCards key={index} group={group} />
            })}
        </div>
    )
}

export default Home
