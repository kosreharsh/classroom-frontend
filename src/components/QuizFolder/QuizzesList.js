import { List, ListItem, ListItemText } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { Link, Outlet, useOutletContext } from 'react-router-dom'
import { useState } from 'react'


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
    const [showForm, setshowForm] = useState(false);
    const { token, class_id } = useOutletContext()
    const { register, handleSubmit, reset } = useForm()
    const { data, isLoading } = useQuery('getQuizList', () => fetchquizlist(token, class_id))
    const Mutation = useMutation(addQuiz, {
        onSuccess: (data) => {
            console.log(data)

        }
    })
    const onSubmit = (inputData) => {
        console.log(inputData)
        Mutation.mutate({ token, class_id, inputData })
        reset()
    }
    const changeFormState = () => {
        setshowForm(prevState => !prevState)
    }
    if (isLoading) {
        return <h3>Loading...</h3>
    }
    return (
        <div>
            <div style={{ 'marginTop': 10, 'marginLeft': 10 }}>
                {
                    !showForm ?
                        <> <button style={{ 'height': 35, 'padding': 5 }} onClick={changeFormState}>Create a new Quiz</button></>
                        :
                        <> <button style={{ 'height': 35, 'padding': 10 }} onClick={changeFormState}>Close Form</button></>
                }

                {
                    showForm &&
                    <form style={{ 'width': 500, 'display': 'flex', 'flexDirection': 'column', 'marginTop': 5 }} onSubmit={handleSubmit(onSubmit)}>
                        <input style={{ 'height': 35, 'paddingLeft': 5, 'marginBottom': 5 }} type='text' placeholder='Enter Quiz Title' {...register('quizname')} />
                        <input style={{ 'height': 35, 'paddingLeft': 5, 'marginBottom': 5 }} type='text' placeholder='Description' {...register('description')} />
                        <input style={{ 'height': 35 }} type='submit' value='Submit' />
                    </form>
                }
            </div>
            <div>
                <List>
                    {
                        data.map((quiz, index) => {
                            return <ListItem key={index} ><Link to={`${quiz.id}`} ><ListItemText>{quiz.quizname}</ListItemText></Link></ListItem>
                        })
                    }
                </List>
            </div>
            <Outlet context={{ token }} />
        </div>
    )
}

export default QuizzesList
