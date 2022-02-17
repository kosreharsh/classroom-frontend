import { useMutation, useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import { Link, useOutletContext, Outlet } from 'react-router-dom'
import { List, ListItem, ListItemText } from '@mui/material'
import { useState } from 'react'
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
    const [showForm, setshowForm] = useState(false)
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
    const changeFormState = () => {
        setshowForm(prevState => !prevState)
    }
    const onSubmit = (inputData) => {
        console.log(inputData)
        Mutation.mutate({ token, class_id, inputData })
    }
    return (
        <div>
            <div style={{ 'marginTop': 10, 'marginLeft': 10 }}>
                {
                    !showForm ?
                        <> <button style={{ 'height': 35, 'padding': 5 }} onClick={changeFormState}>Assign New Task</button></>
                        :
                        <> <button style={{ 'height': 35, 'padding': 10 }} onClick={changeFormState}>Close Form</button></>
                }
                {
                    showForm &&

                    <form style={{ 'width': 500, 'marginTop': 5, 'display': 'flex', 'flexDirection': 'column' }} onSubmit={handleSubmit(onSubmit)}>
                        <input style={{ 'height': 35, 'paddingLeft': 5, 'marginBottom': 5 }} type='text' placeholder='Assignment Title'  {...register('title')} />
                        <input style={{ 'height': 35, 'paddingLeft': 5, 'marginBottom': 5 }} type='text' placeholder='Task Description' {...register('task')} />
                        <input style={{ 'height': 35, 'paddingLeft': 5, 'marginBottom': 5 }} type='datetime-local' {...register('deadline')} />
                        <input style={{ 'height': 35, 'padding': 5, 'marginBottom': 5 }} type="submit" value="Submit" />
                    </form>
                }
            </div>
            <List>
                {
                    data.map((task, index) => {
                        return <ListItem key={index}><Link to={`${task.id}`}><ListItemText>{task.title}</ListItemText></Link></ListItem>
                    })
                }
            </List>
            <Outlet />
        </div>
    )
}

export default AssignedTasksList
