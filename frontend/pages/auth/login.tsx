import { useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import { useSWRConfig } from 'swr'
// Hooks
import useLoginForm from '../../components/forms/hooks/use-login-form'
// Local components
import TextInput from '../../components/forms/fields/TextInput'
import Button from '../../components/ui/Button'
// Constants
import { GET_USER_ENDPOINT, HOME_URL, FORGOT_PASSWORD_URL, LOGIN_ENDPOINT } from '../../constants/urls'
import { getUnauthorizedRestAPIHeaders } from '../../utils/headers'
// Utils
import { setCookie } from '../../utils/cookies'


interface LoginForm {
	email: string,
	password: string,
}

const Login: NextPage = () => {
	const [formSubmitting, setFormSubmitting] = useState(false)
	const router = useRouter()
	const { mutate } = useSWRConfig()
	const methods = useLoginForm()

	const login = async (values: LoginForm) => {
		setFormSubmitting(true)
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
			return false
		})
		if (result) {
			setCookie('token', result.token, 7)
			mutate(GET_USER_ENDPOINT)
			router.push(HOME_URL)
		} else {
			methods.setError('email', { message: 'Unable to login with these credentials' })
			methods.setError('password', { message: 'Unable to login with these credentials' })
		}
		setFormSubmitting(false)
	}

	return (
		<FormProvider {...methods}>
			<div className="py-10 px-6">
				<form onSubmit={methods.handleSubmit(login)}>
					<TextInput 
						type="email"
						autoComplete="email"
						id="email"
						placeholder="Email"
						name="email"
					/>
					<TextInput 
						type="password"
						autoComplete="current-password"
						id="current-password"
						placeholder="Password"
						name="password"
					/>
					<div>
						<Link href={FORGOT_PASSWORD_URL} passHref>
							<p className="action-text">Forgot your password?</p>
						</Link>
					</div>
					<Button
						disabled={formSubmitting}
						loading={formSubmitting}
						type="submit"
					>
						Submit
					</Button>
				</form>
			</div>
		</FormProvider>
	)
}

export default Login
