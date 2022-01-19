import { useQuery } from 'react-query'
import { useContext, } from 'react'
import { useParams, Link, Outlet } from 'react-router-dom'
import userContext from '../../Contexts/userContext'



const fetchClassDetail = async (token, class_id) => {
    const authToken = `Bearer ${token}`
    const res = await fetch(`http://localhost:8000/api/v1/group/${class_id}/`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': authToken,
        }
    })
    return res.json()
}

function SingleClass() {

    const { class_id } = useParams()
    const { user } = useContext(userContext)
    const token = user?.accessToken
    const { data: classDetail, isLoading } = useQuery('getClassDetail', () => fetchClassDetail(token, class_id), {
        refetchOnWindowFocus: false
    })

    if (isLoading) {
        return <h3>Loading...</h3>
    }
    return (
        <div>
            <h1>{classDetail.name}</h1>
            <Link to='tasks'>assignment</Link>
            <Link to='quiz'>quiz</Link>
            <Link to=''>post</Link>
            <Outlet context={{ token, class_id }} />

        </div>
    )
}

export default SingleClass
