import AuthLayout from "@/shared/layouts/auth-layout/auth-layout"
import s from "./main-page.module.css"

const MainPage = () => {
  return (
    <AuthLayout>
      <h1 className={s.title}>Главная</h1>
    </AuthLayout>
  )
}

export default MainPage
