import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'

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

function AssignedTasksList({ token, class_id }) {
    const { register, handleSubmit } = useForm()
    const Mutation = useMutation(addAssignment, {
        onSuccess: (data) => {
            console.log(data)

        }
    })
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
        </div>
    )
}

export default AssignedTasksList
