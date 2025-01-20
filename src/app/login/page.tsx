import FormLayout from "@/shared/layouts/form-layout/form-layout"
import LoginForm from "./ui/login-form"
import AuthLayout from "@/shared/layouts/auth-layout/auth-layout"

const Login = () => {

  return (
    <AuthLayout>
      <FormLayout loginPage title="Войти">
        <LoginForm />
      </FormLayout>
    </AuthLayout>
  )
}

export default Login
