import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../schema/login-schema'


export interface LoginForm {
	email: string,
	password: string,
}

const useLoginForm = () => {
	const formMeta = useForm<LoginForm>({
		resolver: yupResolver(loginSchema)
	})
	return formMeta
}

export default useLoginForm
