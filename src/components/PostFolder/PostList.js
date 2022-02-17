import Post from './Post'
import { useQuery, useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'
import { List } from '@mui/material'

const fetchPostList = async (token, class_id) => {
    const authToken = `Bearer ${token}`
    const res = await fetch(`http://localhost:8000/api/v1/group/${class_id}/get_post_list/`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': authToken,
        }
    })
    const data = res.json()

    return data
}
const addPost = async ({ token, class_id, inputData }) => {

    const authToken = `Bearer ${token}`
    const res = await fetch(`http://localhost:8000/api/v1/group/${class_id}/addposts/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': authToken,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(inputData)
    })
    return res.json()
}


function PostList() {
    const { token, class_id } = useOutletContext()
    const { register, handleSubmit, reset } = useForm()
    const { data: postData, isLoading, refetch } = useQuery('getPostList', () => fetchPostList(token, class_id), {
        refetchOnWindowFocus: false
    })
    const Mutation = useMutation(addPost, {
        onSuccess: (data) => {
            console.log(data)
            refetch()
        }
    })
    const onSubmit = (inputData) => {
        Mutation.mutate({ token, class_id, inputData })
        reset()
    }
    if (isLoading) {
        return <h4>Loading post...</h4>
    }
    return (
        <div style={{ 'paddingLeft': 5, 'marginTop': 20 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input style={{ 'width': 600, 'height': 35, 'paddingLeft': 5 }} type='text' placeholder='Post Message' {...register("message")} />
                <input style={{ 'width': 100, 'height': 35, 'marginLeft': 5 }} type="submit" value="Submit" />
            </form>
            <List>

                {
                    postData.map((post, index) => {
                        return <Post key={index} post={post} />
                    })
                }
            </List>
        </div>
    )
}

export default PostList
