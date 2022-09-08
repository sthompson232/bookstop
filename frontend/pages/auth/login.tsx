import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
// Constants
import { GET_USER_ENDPOINT, LOGIN_ENDPOINT } from '../../constants/urls'
import { getUnauthorizedRestAPIHeaders } from '../../utils/headers'
// Utils
import { setCookie } from '../../utils/cookies'


interface LoginForm {
	email: string,
	password: string,
}


const Login: NextPage = () => {
	const { mutate } = useSWRConfig()
	const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()

	const login = async (values: LoginForm) => {
		const result = await fetch(LOGIN_ENDPOINT, {
			method: 'POST',
			body: JSON.stringify({
				email: values.email,
				password: values.password,
			}),
			headers: {
				...getUnauthorizedRestAPIHeaders()
			}
		}).then(res => {
			if (res.ok)	{
				return res.json()
			}
			return { status: 'failed' }
		})
		if (!('status' in result)) {
			setCookie('token', result.token, 7)
			mutate(GET_USER_ENDPOINT)
		}
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit(login)}>
				<input type="email" {...register('email')} />
				{errors?.email && <span>{errors.email.message}</span>}
				<input type="password" {...register('password')} />
				{errors?.password && <span>{errors.password.message}</span>}
				<input type="submit" />
			</form>
		</div>
	)
}

export default Login
