import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

const addQuiz = async ({ token, class_id, inputData }) => {
    const authToken = `Bearer ${token}`
    const res = await fetch(`http://localhost:8000/api/v1/group/${class_id}/createQuiz/`, {
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
function QuizzesList({ token, class_id }) {
    const { register, handleSubmit } = useForm()
    const Mutation = useMutation(addQuiz, {
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
                <input type='text' {...register('quizname')} />
                <input type='text' {...register('description')} />
                <input type='submit' value='Submit' />
            </form>
        </div>
    )
}

export default QuizzesList
