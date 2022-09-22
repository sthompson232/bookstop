import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
// Local components
import TextInput from '../../../../components/forms/fields/TextInput'
import Button from '../../../../components/ui/Button'
// Hooks
import useResetPasswordForm, { ResetPasswordFormTypes } from '../../../../components/forms/hooks/auth/use-reset-password-form'
// Constants
import { GENERIC_ERROR_MESSAGE } from '../../../../constants/error-messages'
// Utils
import { RESET_PASSWORD_ENDPOINT } from '../../../../constants/urls'
import { getUnauthorizedRestAPIHeaders } from '../../../../utils/headers'


interface PropTypes {
	setFormSubmittedSuccessfully: Function
}

const ResetPasswordForm = ({ setFormSubmittedSuccessfully }: PropTypes) => {
  const router = useRouter();
  const methods = useResetPasswordForm()

  const submitForm = async (values: ResetPasswordFormTypes) => {
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
					control={methods.control}
					type="password"
					autoComplete="new-password"
					placeholder="Password"
					name="password1"
					error={methods.formState.errors?.password1}
				/>
				<TextInput
					type="password"
					control={methods.control}
					autoComplete="new-password"
					placeholder="Confirm password"
					name="password2"
					error={methods.formState.errors?.password2}
				/>
				<Button type="submit">Reset password</Button>
			</form>
    </FormProvider>
	)
}

export default ResetPasswordForm;
