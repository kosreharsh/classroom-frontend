import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useContext } from 'react'
import tokenContext from '../../tokenContext'
const fetchToken = async (creditionals) => {
    const res = await fetch('http://localhost:8000/api/token/', {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(creditionals)
    })
    return res.json()
}
function Login() {
    const { setToken } = useContext(tokenContext)
    const { register, handleSubmit } = useForm()
    const Mutation = useMutation(fetchToken, {
        onSuccess: data => {
            console.log(data)
            setToken(data)
        }
    })
    const onSubmit = (inputData) => {
        console.log(inputData)
        Mutation.mutate(inputData)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' {...register("username")} />
                <input type='password' {...register("password")} />
                <input type='submit' value="Submit" />
            </form>
        </div>
    )
}

export default Login
