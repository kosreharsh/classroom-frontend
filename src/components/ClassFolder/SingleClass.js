import { useQuery } from 'react-query'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import tokenContext from '../../tokenContext'
import PostList from '../PostFolder/PostList'
import AssignedTasksList from '../AssignmentFolder/AssignedTasksList'
import QuizzesList from '../QuizFolder/QuizzesList'

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
    const { token } = useContext(tokenContext)
    const { data: classDetail, isLoading } = useQuery('getClassDetail', () => fetchClassDetail(token, class_id), {
        refetchOnWindowFocus: false
    })

    if (isLoading) {
        return <h3>Loading...</h3>
    }
    return (
        <div>
            <h1>{classDetail.name}</h1>
            <AssignedTasksList token={token} class_id={class_id} />
            <QuizzesList token={token} class_id={class_id} />
            <PostList token={token} class_id={class_id} />

        </div>
    )
}

export default SingleClass
