import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import userContext from '../../Contexts/userContext'
function CreateAssignedTasks() {
    const { class_id } = useParams()
    const { user } = useContext(userContext)
    const token = user?.accessToken
    const { register, handleSubmit } = useForm()
    const Mutation = useMutation(CreateAssignedTasks, {
        onSuccess: (data) => {
            console.log(data)
        }
    })
    const onSubmit = (inputData) => {
        Mutation.mutate({ token, class_id, inputData })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <input type='text' placeholder='Title' {...register('title')} />
                <input type='text' placeholder='Tasks Description' {...register('task')} />
                <input type='datetime-local' placeholder='Deadline' {...register('deadline')} />
                <input type='submit' value='Submit' />
            </form>
        </div>
    )
}

export default CreateAssignedTasks
