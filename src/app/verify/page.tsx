"use client"

import { login, signup } from '@/api/auth-api/auth';
import { useAuthStore } from '@/shared/stores/auth-store'
import Button from '@/shared/ui/button/button';
import Input from '@/shared/ui/input/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import s from "./ui/page.module.css"

const Verify = () => {
  const router = useRouter();

  const { isLoginVerification, email, password, firstName } = useAuthStore();
  const [emailCode, setEmailCode] = useState<string>("");

  useEffect(() => {
    if(isLoginVerification === undefined){
      router.push("/login")
    }
  }, [])

  const handleLogin = () => {
    login({ email, password, emailCode })
      .then(res => {
        console.log(res, "ответ при входе")
        router.push("/")
      })
      .catch(err => {
        router.push("/login")
        console.log(err, "ошибка при входе")
      })
  }
  const handleSignup = () => {
    signup({ email, password, emailCode, firstName })
      .then(res => {
        console.log(res, "ответ при регистрации")
        router.push("/")
      })
      .catch(err => {
        router.push("/signup")
        console.log(err, "ошибка при регистрации")
      })
  }

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={isLoginVerification ? handleLogin : handleSignup}>
        <h1>Верификация</h1>
        <p>
          Пожалуйста, введите 6-значный проверочный код,
          который был отправлен на ваш адрес электронной почты.
          Код действителен в течение 30 минут.
        </p>
        <label htmlFor="verifyCode">Проверочный код</label>
        <Input
          type="number"
          placeholder='XXXXXX'
          id="verifyCode"
          value={emailCode}
          onChange={e => setEmailCode(e.target.value)}
        />
        <Button>
          {
            isLoginVerification
              ? "Войти"
              : "Зарегистрироваться"
          }
        </Button>
      </form>
    </div>
  )
}

export default Verify
