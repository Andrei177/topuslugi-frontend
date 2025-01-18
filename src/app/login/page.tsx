import AuthLayout from "@/shared/layouts/auth-layout/auth-layout"
import LoginForm from "./ui/login-form"

const Login = () => {

  return (
    <AuthLayout loginPage title="Войти">
      <LoginForm/>
    </AuthLayout>
  )
}

export default Login
