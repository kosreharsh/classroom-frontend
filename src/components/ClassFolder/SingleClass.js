import { useQuery } from 'react-query'
import { useContext, } from 'react'
import { useParams, Link, Outlet } from 'react-router-dom'
import userContext from '../../Contexts/userContext'
import { Box, Container, Typography } from '@mui/material'




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
        <Container>
            <Typography variant='h3' mt={3}>{classDetail.name.toUpperCase()}</Typography>
            <Box sx={{ 'marginTop': 1, 'paddingLeft': 1, 'width': 500, 'display': 'flex', 'justifyContent': 'space-between', }} >
                <Link to=''><Typography variant='h5'>Post</Typography></Link>
                <Link to='tasks'><Typography variant='h5'>Assignment</Typography></Link>
                <Link to='quiz'><Typography variant='h5'>Quiz</Typography></Link>
            </Box >

            <Outlet context={{ token, class_id }} />

        </Container >
    )
}

export default SingleClass
