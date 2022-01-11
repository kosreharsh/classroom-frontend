import Post from './Post'
import { useQuery, useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
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


function PostList({ token, class_id }) {
    const { register, handleSubmit } = useForm()
    const { data: postData, isLoading } = useQuery('getPostList', () => fetchPostList(token, class_id), {
        refetchOnWindowFocus: false
    })
    const Mutation = useMutation(addPost, {
        onSuccess: (data) => {
            console.log(data)

        }
    })
    const onSubmit = (inputData) => {
        Mutation.mutate({ token, class_id, inputData })
    }
    if (isLoading) {
        return <h4>Loading post...</h4>
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' {...register("message")} />
                <input type="submit" value="Submit" />
            </form>
            <div>

                {
                    postData.map((post, index) => {
                        return <Post key={index} post={post} />
                    })
                }
            </div>
        </div>
    )
}

export default PostList
