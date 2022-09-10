import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPasswordSchema } from '../schema/forgot-password-schema'


export interface ForgotPasswordForm {
	email: string
}

const useForgotPasswordForm = () => {
	const formMeta = useForm<ForgotPasswordForm>({
		resolver: yupResolver(forgotPasswordSchema)
	})
	return formMeta
}

export default useForgotPasswordForm
