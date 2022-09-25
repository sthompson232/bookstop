import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// Constants
import { forgotPasswordSchema } from '../../schema/auth';

export interface ForgotPasswordFormTypes {
  email: string
}

const forgotPasswordDefaultValues = {
  email: '',
};

const useForgotPasswordForm = () => {
  const formMeta = useForm<ForgotPasswordFormTypes>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: forgotPasswordDefaultValues,
  });
  return formMeta;
};

export default useForgotPasswordForm;
