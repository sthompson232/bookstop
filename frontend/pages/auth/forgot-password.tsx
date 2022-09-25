import { useState } from 'react';
import type { NextPage } from 'next';
import ForgotPasswordForm from '../../components/forms/forms/auth/ForgotPasswordForm';

const ForgotPassword: NextPage = () => {
  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);

  const renderResetRequestSentMessage = () => (
    <h1>Reset request sent</h1>
  );

  return (
    <div className="container">
      {formSubmittedSuccessfully
        ? renderResetRequestSentMessage()
        : <ForgotPasswordForm setFormSubmittedSuccessfully={setFormSubmittedSuccessfully} />}
    </div>
  );
};

export default ForgotPassword;
