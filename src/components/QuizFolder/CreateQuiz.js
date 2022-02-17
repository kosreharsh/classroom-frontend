import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useContext } from 'react'
import userContext from '../../Contexts/userContext'
import { useParams } from 'react-router-dom'

const createQuiz = async (token, class_id, inputData) => {
    const authToken = `Bearer ${token}`
    const res = await fetch(`http://localhost:8000/api/v1/${class_id}/createQuiz/`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': authToken,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(inputData)
    })
    return res.json()
}
function CreateQuiz() {
    const { user } = useContext(userContext)
    const { class_id } = useParams()
    const token = user?.accessToken
    const { register, handleSubmit } = useForm()
    const Mutation = useMutation(({ token, class_id, inputData }) => createQuiz(token, class_id, inputData), {
        onSuccess: (data) => {

        }
    })
    const onSubmit = (inputData) => {
        Mutation.mutate({ token, class_id, inputData })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <input type='text' {...register('quizname')} />
                <input type='text' {...register('description')} />
                <input type='number' {...register('text_interval')} />
                <input type='time' {...register('test_starttime')} />
                <input type='submit' value='Submit' />
            </form>
        </div>
    )
}

export default CreateQuiz
