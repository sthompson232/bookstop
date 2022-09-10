import { useState } from 'react'
import type { NextPage } from 'next'
import { FormProvider } from 'react-hook-form'
// Hooks
import useForgotPasswordForm from '../../components/forms/hooks/use-forgot-password-form'
// Local components
import TextInput from '../../components/forms/fields/TextInput'
import Button from '../../components/ui/Button'
// Utils
import { getUnauthorizedRestAPIHeaders } from '../../utils/headers'
// Constants
import { FORGOT_PASSWORD_ENDPOINT } from '../../constants/urls'


interface ForgotPasswordForm {
	email: string
}

const ForgotPassword: NextPage = () => {
	const [resetRequestSent, setResetRequestSent] = useState(false)
	const [formSubmitting, setFormSubmitting] = useState(false)
	const methods = useForgotPasswordForm()

	const submitForm = async (values: ForgotPasswordForm) => {
		setFormSubmitting(true)
		const result = await fetch(FORGOT_PASSWORD_ENDPOINT, {
			method: 'POST',
			body: JSON.stringify({
				email: values.email
			}),
			headers: {
				...getUnauthorizedRestAPIHeaders()
			}
		}).then(res => res.ok)
		if (result) {
			setResetRequestSent(true)
		} else {
			methods.setError('email', { message: 'Error - Please try again later' })
		}
		setFormSubmitting(false)
	}

	const renderForgotPasswordForm = () => (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(submitForm)}>
				<TextInput
					type="email"
					autoComplete="email"
					id="email"
					placeholder="Email"
					name="email"
				/>
				<Button
					type="submit"
					loading={formSubmitting}
					disabled={formSubmitting}
				>
					Submit
				</Button>
			</form>
		</FormProvider>
	)

	const renderResetRequestSentMessage = () => (
		<h1>Reset request sent</h1>
	)

	return resetRequestSent ? renderResetRequestSentMessage() : renderForgotPasswordForm()
}

export default ForgotPassword
