import FormLayout from "@/shared/layouts/form-layout/form-layout"
import AuthForm from "./ui/auth-form"
import AuthLayout from "@/shared/layouts/auth-layout/auth-layout"
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Авторизация Топуслуги',
  description: 'Авторизация на Топуслугах предоставляет Вам много возможностей',
}

const Auth = () => {

  return (
    <AuthLayout>
      <FormLayout title="Авторизация">
        <AuthForm />
      </FormLayout>
    </AuthLayout>
  )
}

export default Auth
