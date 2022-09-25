import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schema/auth';

export interface LoginFormTypes {
  email: string,
  password: string,
}

const loginFormDefaultValues = {
  email: '',
  password: '',
};

const useLoginForm = () => {
  const formMeta = useForm<LoginFormTypes>({
    resolver: yupResolver(loginSchema),
    defaultValues: loginFormDefaultValues,
  });
  return formMeta;
};

export default useLoginForm;
