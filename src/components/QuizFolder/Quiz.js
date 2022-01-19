// import { register, handleSubmit } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useOutletContext, useParams } from 'react-router-dom'



const fetchquiz = async (token, quiz_id) => {
    const authToken = `Bearer ${token}`
    const res = await fetch(`http://localhost:8000/api/v1/quiz/${quiz_id}/`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': authToken
        }
    })

    return res.json()
}
const fetchQuestionSet = async (token, quiz_id) => {
    const authToken = `Bearer ${token}`
    const res = await fetch(`http://localhost:8000/api/v1/quiz/${quiz_id}/questions_list/`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': authToken
        }
    })
    return res.json()
}
function Quiz() {
    const { quiz_id } = useParams()
    const { token } = useOutletContext()
    const { data: question_set, isLoading: isLoading1 } = useQuery(`getQuestionSet-${quiz_id}`, () => fetchQuestionSet(token, quiz_id))
    const { data, isLoading, } = useQuery(`getQuizDetail-${quiz_id}`, () => fetchquiz(token, quiz_id))

    if (isLoading) {
        return <h3>Loading..</h3>
    }
    if (isLoading1) {
        return <h4>Loading Question...</h4>
    }

    return (
        <div>
            {data.quizname}


            <ul>
                {

                    question_set.map((q, index) => {
                        return <li key={index}>{q.question}</li>
                    })
                }
            </ul>
        </div>
    )




}

export default Quiz
