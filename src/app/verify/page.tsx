"use client"

import { login, signup } from '@/api/auth-api/auth';
import { useAuthStore } from '@/shared/stores/auth-store'
import Button from '@/shared/ui/button/button';
import Input from '@/shared/ui/input/input';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react'
import s from "./ui/page.module.css"
import Loader from '@/shared/ui/loader/loader';
import cx from "classnames"
import { AxiosError } from 'axios';

const Verify = () => {
  const router = useRouter();

  const { isLoginVerification, email, password, firstName } = useAuthStore();
  const [emailCode, setEmailCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (isLoginVerification === undefined) {
      router.push("/login")
    }
  }, [])

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    login({ email, password, emailCode })
      .then(res => {
        console.log(res, "ответ при входе")
        router.push("/")
        if(res.headers.authorization){
          localStorage.setItem("token", res.headers.authorization)
        }
      })
      .catch(err => {
        if (err instanceof AxiosError && err.response?.data.detail) {
          setMessage(String(err.response?.data.detail))
        }
        else {
          setMessage("Произошла непредвиденная ошибка, попробуйте вернуться на страницу входа")
        }
        console.log(err, "ошибка при входе")
      })
      .finally(() => setIsLoading(false))
  }
  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    signup({ email, password, emailCode, firstName })
      .then(res => {
        console.log(res, "ответ при регистрации")
        router.push("/")
        if(res.headers.authorization){
          localStorage.setItem("token", res.headers.authorization)
        }
      })
      .catch(err => {
        if (err instanceof AxiosError && err.response?.data.detail) {
          setMessage(String(err.response?.data.detail))
        }
        else {
          setMessage("Произошла непредвиденная ошибка, попробуйте вернуться на страницу регистрации")
        }
        console.log(err, "ошибка при регистрации")
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={isLoginVerification ? handleLogin : handleSignup}>
        {isLoading && <Loader className={s.loader} />}
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
        <p className={
          message.length > 0
            ? cx(s.msg, s.visible)
            : cx(s.msg, s.hidden)
        }>{message}</p>
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
