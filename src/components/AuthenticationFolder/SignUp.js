import { useForm } from "react-hook-form"
import { useMutation } from "react-query"

const createNewUser = async inputData => {
    const res = await fetch('http://localhost:8000/api/v1/user/', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        }
    })
    return res.json()
}
function SignUp() {
    const Mutation = useMutation(createNewUser, {
        onSuccess: (data) => {
            console.log(data)
        }
    })
    const onSubmit = (inputData) => {
        console.log(inputData)
        Mutation.mutate(inputData)
    }
    const { register, handleSubmit } = useForm()
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' {...register('username')} placeholder="Username" />
                <input type='email' {...register('email')} placeholder="Email Address" />
                <input type='password' {...register('password')} placeholder="Password" />
                <input type='password' {...register('password2')} placeholder="Confirm Password" />
                <input type='submit' value='Submit' />
            </form>
        </div>
    )
}

export default SignUp
