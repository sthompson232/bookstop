import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '../../schema/auth';

export interface ResetPasswordFormTypes {
  password1: string,
  password2: string
}

const resetFormDefaultValues = {
  password1: '',
  password2: '',
};

const useResetPasswordForm = () => {
  const formMeta = useForm<ResetPasswordFormTypes>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: resetFormDefaultValues,
  });
  return formMeta;
};

export default useResetPasswordForm;
