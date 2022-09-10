import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// Utils
import { LOGIN_URL, RESET_PASSWORD_ENDPOINT } from '../../../../constants/urls';
import { getUnauthorizedRestAPIHeaders } from '../../../../utils/headers';


const schema = yup.object({
  new_password1: yup.string().required('This field is required').min(8, 'Password is too short - should be a minimum of 8 characters.'),
  new_password2: yup.string().required('This field is required').min(8, 'Password is too short - should be a minimum of 8 characters.').oneOf([yup.ref('new_password1')], 'Passwords do not match')
});

interface ResetPasswordForm {
	new_password1: string,
	new_password2: string
}


const ResetPassword = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data: ResetPasswordForm) => {
    const payload = {
      new_password1: data.new_password1,
      new_password2: data.new_password2,
      uid: router.query.uid,
      token: router.query.token,
    };
    fetch(RESET_PASSWORD_ENDPOINT, {
      method: 'POST',
      headers: {
        ...getUnauthorizedRestAPIHeaders(),
      },
      body: JSON.stringify(payload),
    }).then(() => router.push(LOGIN_URL));
  };

  return (
    <div className="page-container prose">
      <div className="card mt-8 sm:mt-24">
        <h2 className="mt-0 mb-2">Reset Password</h2>
        <form onSubmit={handleSubmit((data) => submitForm(data))}>
          <input
            {...register('new_password1')}
            className="textfield mb-2"
            placeholder="New Password"
            name="new_password1"
            type="password"
            autoComplete="password"
          />
          {!!errors.new_password1 &&
            <p className="error-text">{errors.new_password1?.message}</p>
          }
          <input
            {...register('new_password2')}
            className="textfield"
            placeholder="Confirm Password"
            name="new_password2"
            type="password"
            autoComplete="password"
          />
          {!!errors.new_password2 &&
            <p className="error-text">{errors.new_password2?.message}</p>
          }
          <div className="btn-primary">
            <button type="submit" className="btn">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
