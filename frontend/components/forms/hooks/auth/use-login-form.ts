import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schema/auth';

export interface LoginFormTypes {
  email: string,
  password: string,
}

const useLoginForm = () => {
  const formMeta = useForm<LoginFormTypes>({
    resolver: yupResolver(loginSchema),
  });
  return formMeta;
};

export default useLoginForm;
