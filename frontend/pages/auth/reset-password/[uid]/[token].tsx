import type { NextPage } from 'next';
// Local components
import ResetPasswordForm from '../../../../components/forms/forms/auth/ResetPasswordForm';

const ResetPassword: NextPage = () => (
  <div className="container">
    <ResetPasswordForm />
  </div>
);

export default ResetPassword;
