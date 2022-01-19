import { useMutation, useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import { Link, useOutletContext, Outlet } from 'react-router-dom'
const addAssignment = async ({ token, class_id, inputData }) => {
    const authToken = `Bearer ${token}`
    const res = await fetch(`http://localhost:8000/api/v1/group/${class_id}/add_assignment/`, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Authorization': authToken,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(inputData)
    })
    return res.json()
}
const fetchAssignedTasks = async (token, class_id) => {
    const authToken = `Bearer ${token}`

    const res = await fetch(`http://localhost:8000/api/v1/group/${class_id}/get_assignment_list/`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': authToken,

        },

    })
    return res.json()
}

function AssignedTasksList() {
    const { token, class_id } = useOutletContext()
    const { register, handleSubmit } = useForm()
    const { data, isLoading } = useQuery('getAssignedTasks', () => fetchAssignedTasks(token, class_id))
    const Mutation = useMutation(addAssignment, {
        onSuccess: (data) => {
            console.log(data)

        }
    })
    if (isLoading) {
        return <h4>Loading Assignments...</h4>
    }
    const onSubmit = (inputData) => {
        console.log(inputData)
        Mutation.mutate({ token, class_id, inputData })
    }
    return (
        <div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' {...register('title')} />
                <input type='text' {...register('task')} />
                <input type='datetime-local' {...register('deadline')} />
                <input type="submit" value="Submit" />
            </form>
            <div>
                {
                    data.map((task, index) => {
                        return <div key={index}><Link to={`${task.id}`}>{task.title}</Link></div>
                    })
                }
            </div>
            <Outlet />
        </div>
    )
}

export default AssignedTasksList
