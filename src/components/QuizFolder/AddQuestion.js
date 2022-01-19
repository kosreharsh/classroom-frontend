import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

const addQuestions = async (token, quiz_id, inputData) => {
    const authToken = `Bearer ${token}`
    const res = await fetch(`http://localhost:8000/api/v1/quiz/${quiz_id}/createQuestion/`, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Authorization': authToken,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(inputData)
    })
    return res.json()
}

function AddQuestion({ token, quiz_id }) {
    const { register, handleSubmit } = useForm()
    const Mutation = useMutation(({ token, quiz_id, inputData }) => addQuestions(token, quiz_id, inputData), {
        onSuccess: (data) => {
            console.log(data)
        }
    })
    const onSubmit = async (inputData) => {
        Mutation.mutate({ token, quiz_id, inputData })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' placeholder='question' {...register("question")} />
                <input type='text' placeholder='Answer - correct Option Number'{...register("answer")} required />
                <input type='text' placeholder='Option 1' {...register("option1")} required />
                <input type='text' placeholder='Option 2' {...register("option2")} required />
                <input type='text' placeholder='Option 3' {...register("option3")} />
                <input type='text' placeholder='Option 4' {...register("option4")} />
                <input type='submit' value='Submit' />
            </form>
        </div>
    )
}

export default AddQuestion
