import FormLayout from "@/shared/layouts/form-layout/form-layout"
import SignupForm from "./ui/signup-form"
import AuthLayout from "@/shared/layouts/auth-layout/auth-layout"

const Signup = () => {

  return (
    <AuthLayout>
      <FormLayout title="Регистрация">
        <SignupForm />
      </FormLayout>
    </AuthLayout>
  )
}

export default Signup
