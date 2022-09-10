import { useState } from 'react'
import type { NextPage } from 'next'
// Local components
import ResetPasswordForm from '../../../../components/forms/forms/auth/ResetPasswordForm'
import LoginForm from '../../../../components/forms/forms/auth/LoginForm'


interface ResetPasswordForm {
	password1: string,
	password2: string
}

const ResetPassword: NextPage = () => {
	const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false)

	const renderResetSuccessfulMessage = () => (
		<div>
			<h1>Password reset successful</h1>
			<LoginForm />
		</div>
	)

  return formSubmittedSuccessfully
		? renderResetSuccessfulMessage() 
		: <ResetPasswordForm setFormSubmittedSuccessfully={setFormSubmittedSuccessfully} />
}

export default ResetPassword;
