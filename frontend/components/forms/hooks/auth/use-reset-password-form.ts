import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '../../schema/auth';

export interface ResetPasswordFormTypes {
  password1: string,
  password2: string
}

const useResetPasswordForm = () => {
  const formMeta = useForm<ResetPasswordFormTypes>({
    resolver: yupResolver(resetPasswordSchema),
  });
  return formMeta;
};

export default useResetPasswordForm;
