import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordSchema } from '../schema/reset-password-schema'


export interface resetPasswordForm {
	password1: string,
	password2: string
}

const useResetPasswordForm = () => {
	const formMeta = useForm<resetPasswordForm>({
		resolver: yupResolver(resetPasswordSchema)
	})
	return formMeta
}

export default useResetPasswordForm
