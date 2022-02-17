import { useQuery, useMutation } from 'react-query'
import { useContext } from 'react'
import userContext from '../../Contexts/userContext'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

const addAssignmentFiles = async ({ token, id, inputData }) => {
    const authToken = `Bearer ${token}`
    const res = await fetch(``, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Authorization': authToken,
            'Content-type': 'application/pdf'
        }
    })
    return res.json()
}
const fetchAssignedTask = async (token, id) => {
    const authToken = `Bearer ${token}`
    const res = await fetch(`http://localhost:8000/api/v1/assignment/${id}/`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': authToken
        }
    })
    return res.json()
}
function AssignedTask() {
    const { user } = useContext(userContext)
    const token = user?.accessToken
    const { id } = useParams()
    const { register, handleSubmit, reset } = useForm()
    const { data: task, isLoading } = useQuery(`getAssignedTask-${id}`, () => fetchAssignedTask(token, id))
    const Mutation = useMutation(addAssignmentFiles, {
        onSuccess: (data) => {
            console.log(data)
        }
    })
    const onSubmit = async (inputData) => {
        const id = task.id
        Mutation.mutate({ token, id, inputData })
        reset()
    }
    if (isLoading) {
        return <h4>Loading..</h4>
    }
    return (
        <div>
            {task.title}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input style={{ 'height': 35, 'paddingLeft': 5, 'marginBottom': 5 }} type='file' {...register('attachments')} />
                <input style={{ 'height': 35, 'paddingLeft': 5, 'marginBottom': 5 }} type='submit' value='Submit' />
            </form>
        </div>
    )
}

export default AssignedTask
