import AuthLayout from "@/shared/layouts/auth-layout/auth-layout"
import SignupForm from "./ui/signup-form"

const Signup = () => {

  return (
    <AuthLayout title="Регистрация">
      <SignupForm/>
    </AuthLayout>
  )
}

export default Signup
