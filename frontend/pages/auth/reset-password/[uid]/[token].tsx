import { useState } from 'react'
import type { NextPage } from 'next'
// Local components
import ResetPasswordForm from '../../../../components/forms/forms/auth/ResetPasswordForm'
import LoginForm from '../../../../components/forms/forms/auth/LoginForm'


const ResetPassword: NextPage = () => {
	const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false)

	const renderResetSuccessfulMessage = () => (
		<div>
			<h1>Password reset successful</h1>
			<LoginForm />
		</div>
	)

  return (
		<div className="container">
			{formSubmittedSuccessfully
				? renderResetSuccessfulMessage() 
				: <ResetPasswordForm setFormSubmittedSuccessfully={setFormSubmittedSuccessfully} />
			}
		</div>
	)
}

export default ResetPassword;
