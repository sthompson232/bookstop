import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
// Hooks
import useForgotPasswordForm from '../../hooks/use-forgot-password-form'
// Local components
import TextInput from '../../fields/TextInput'
import Button from '../../../ui/Button'
// Constants
import { FORGOT_PASSWORD_ENDPOINT } from '../../../../constants/urls'
import { GENERIC_ERROR_MESSAGE } from '../../../../constants/error-messages'
// Utils
import { getUnauthorizedRestAPIHeaders } from '../../../../utils/headers'


interface PropTypes {
	setFormSubmittedSuccessfully: Function
}

interface ForgotPasswordForm {
	email: string
}

const ForgotPasswordForm = ({ setFormSubmittedSuccessfully }: PropTypes) => {
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
			setFormSubmittedSuccessfully(true)
		} else {
			methods.setError('email', { message: GENERIC_ERROR_MESSAGE })
		}
		setFormSubmitting(false)
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(submitForm)}>
				<TextInput
					autoFocus
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
}

export default ForgotPasswordForm
