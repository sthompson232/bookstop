import type { NextPage } from 'next'
// Local components
import LoginForm from '../../components/forms/forms/auth/LoginForm'


const Login: NextPage = () => {
  return (
    <div className="container">
      <LoginForm />
    </div>
  )
}

export default Login
