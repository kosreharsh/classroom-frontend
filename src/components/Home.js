// import { register, handleSubmit } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useContext } from 'react'
import userContext from '../Contexts/userContext'
import ClassCards from './ClassFolder/ClassCards'
import { Container, List } from '@mui/material'

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
    const { user } = useContext(userContext)
    const token = user?.accessToken


    const { data, isLoading } = useQuery('getClassList', () => fetchClasses(token), {
        refetchOnWindowFocus: false
    })
    if (isLoading) {
        return <h1>Loading</h1>
    }
    return (
        <Container>
            <div>
                {user?.username}
                <List >
                    {data.map((group, index) => {
                        return <ClassCards key={index} group={group} />
                    })}
                </List>

            </div>
        </Container>
    )
}

export default Home
