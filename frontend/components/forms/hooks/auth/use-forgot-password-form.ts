import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPasswordSchema } from '../../schema/auth'


export interface ForgotPasswordFormTypes {
  email: string
}

const useForgotPasswordForm = () => {
  const formMeta = useForm<ForgotPasswordFormTypes>({
    resolver: yupResolver(forgotPasswordSchema)
  })
  return formMeta
}

export default useForgotPasswordForm
