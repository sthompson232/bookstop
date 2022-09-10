import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
// Local components
import TextInput from '../../../../components/forms/fields/TextInput'
// Hooks
import useResetPasswordForm from '../../../../components/forms/hooks/use-reset-password-form'
import Button from '../../../../components/ui/Button'
// Constants
import { GENERIC_ERROR_MESSAGE } from '../../../../constants/error-messages'
// Utils
import { RESET_PASSWORD_ENDPOINT } from '../../../../constants/urls'
import { getUnauthorizedRestAPIHeaders } from '../../../../utils/headers'


interface PropTypes {
	setFormSubmittedSuccessfully: Function
}

interface ResetPasswordForm {
	password1: string,
	password2: string
}

const ResetPasswordForm = ({ setFormSubmittedSuccessfully }: PropTypes) => {
  const router = useRouter();
  const methods = useResetPasswordForm()

  const submitForm = async (values: ResetPasswordForm) => {
    const result = await fetch(RESET_PASSWORD_ENDPOINT, {
      method: 'POST',
      headers: {
        ...getUnauthorizedRestAPIHeaders(),
      },
      body: JSON.stringify({
				password1: values.password1,
				password2: values.password2,
				uid: router.query.uid,
				token: router.query.token,
			}),
    }).then(res => {
			if (res.ok) {
				setFormSubmittedSuccessfully(true)
			}
			if (res.status === 403) {
				methods.setError('password1', { message: GENERIC_ERROR_MESSAGE })
				methods.setError('password2', { message: GENERIC_ERROR_MESSAGE })
			}
			return res.json()
		})
		if ('errors' in result) {
			const errorString = result.errors.join(' ')
			methods.setError('password1', { message: errorString })
			methods.setError('password2', { message: errorString })
		} else {
			methods.setError('password1', { message: GENERIC_ERROR_MESSAGE })
			methods.setError('password2', { message: GENERIC_ERROR_MESSAGE })
		}
  };

  return (
    <FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(submitForm)}>
				<TextInput
					autoFocus
					type="password"
					autoComplete="new-password"
					id="password1"
					placeholder="Password"
					name="password1"
				/>
				<TextInput
					type="password"
					autoComplete="new-password"
					id="password2"
					placeholder="Confirm password"
					name="password2"
				/>
				<Button type="submit">Reset password</Button>
			</form>
    </FormProvider>
	)
}

export default ResetPasswordForm;
