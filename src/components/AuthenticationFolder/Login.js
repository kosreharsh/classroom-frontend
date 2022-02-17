import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useContext, useState } from 'react'
import userContext from '../../Contexts/userContext'
import { useNavigate } from 'react-router-dom'
const fetchToken = async (creditionals) => {
    const res = await fetch('http://localhost:8000/api/token/', {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(creditionals)
    })
    if (res.ok) {
        return res.json()
    }
    return null
}
function Login() {
    const navigate = useNavigate()
    const [showError, setShowError] = useState(false)
    const { setUser } = useContext(userContext)
    const { register, handleSubmit } = useForm()
    const Mutation = useMutation(fetchToken, {
        onSuccess: async data => {
            if (data !== null) {
                setUser(data)
                navigate('/home')
            }
            else {
                setShowError(true)
            }
        }
    })
    const onSubmit = (inputData) => {

        Mutation.mutate(inputData)
    }
    return (
        <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>

            <form style={{ 'marginTop': 100, 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'width': 300 }} onSubmit={handleSubmit(onSubmit)}>
                <h2 style={{ 'marginBottom': 10 }}>Login Form</h2>
                {showError && <p style={{ border: "1px solid red" }}>Wrong creditionals</p>}
                <input style={{ 'height': 35, 'marginBottom': 5, 'padding': 5 }} type='text' placeholder='Username' {...register("username")} />
                <input style={{ 'height': 35, 'marginBottom': 5, 'padding': 5 }} type='password' placeholder='Password'{...register("password")} />
                <input style={{ 'height': 35, 'marginBottom': 5 }} type='submit' value="Submit" />
            </form>
        </div>
    )
}

export default Login
