import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { Link, Outlet, useOutletContext } from 'react-router-dom'


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
const fetchquizlist = async (token, class_id) => {
    const authToken = `Bearer ${token}`
    const res = await fetch(`http://localhost:8000/api/v1/group/${class_id}/get_quiz_list/`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': authToken
        }
    })
    return res.json()
}
function QuizzesList() {
    const { token, class_id } = useOutletContext()
    const { register, handleSubmit } = useForm()
    const { data, isLoading } = useQuery('getQuizList', () => fetchquizlist(token, class_id))
    const Mutation = useMutation(addQuiz, {
        onSuccess: (data) => {
            console.log(data)

        }
    })
    const onSubmit = (inputData) => {
        console.log(inputData)
        Mutation.mutate({ token, class_id, inputData })
    }
    if (isLoading) {
        return <h3>Loading...</h3>
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' {...register('quizname')} />
                <input type='text' {...register('description')} />
                <input type='submit' value='Submit' />
            </form>
            <div>
                {
                    data.map((quiz, index) => {
                        return <div key={index} ><Link to={`${quiz.id}`} >{quiz.quizname}</Link></div>
                    })
                }
            </div>
            <Outlet context={{ token }} />
        </div>
    )
}

export default QuizzesList
