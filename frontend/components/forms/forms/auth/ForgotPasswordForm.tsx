import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
// Hooks
import useForgotPasswordForm, { ForgotPasswordFormTypes } from '../../hooks/auth/use-forgot-password-form'
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

const ForgotPasswordForm = ({ setFormSubmittedSuccessfully }: PropTypes) => {
	const [formSubmitting, setFormSubmitting] = useState(false)
	const methods = useForgotPasswordForm()

	const submitForm = async (values: ForgotPasswordFormTypes) => {
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
					control={methods.control}
					type="email"
					autoComplete="email"
					placeholder="Email"
					name="email"
					error={methods.formState.errors?.email}
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
